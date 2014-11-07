function reset() {
    var sqlstmt;
    var conn;
    conn = $.db.getConnection();
    sqlstmt = 'SET SCHEMA DEV01';
    conn.prepareStatement(sqlstmt).execute();
    sqlstmt = 'TRUNCATE TABLE "Tweets"';
    conn.prepareStatement(sqlstmt).execute();
    sqlstmt = 'TRUNCATE TABLE PAL_RESULTS';
    conn.prepareStatement(sqlstmt).execute();
    sqlstmt = 'TRUNCATE TABLE PAL_CENTERS';
    conn.prepareStatement(sqlstmt).execute();
    sqlstmt = 'DROP FULLTEXT INDEX "tweets"'; 
    conn.prepareStatement(sqlstmt).execute();
    sqlstmt = 'CREATE FULLTEXT INDEX "tweets" ON "Tweets"("text") CONFIGURATION \'EXTRACTION_CORE_VOICEOFCUSTOMER\' LANGUAGE COLUMN "lang" LANGUAGE DETECTION (\'EN\',\'FR\',\'DE\',\'ES\',\'ZH\') TEXT ANALYSIS ON';
    conn.prepareCall(sqlstmt).execute();
    conn.commit();
    conn.close();
}

if ($.session.hasAppPrivilege("DEV01.live3::Admin")) {
	var cmd = $.request.parameters.get('cmd');  
	switch (cmd) {  
		case "reset":
			reset();
			break; 
		default:  
			$.response.setBody('Invalid Command: ' + cmd);  
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;  
	}
} else {
	$.response.setBody("Not authorized."); 
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
}
