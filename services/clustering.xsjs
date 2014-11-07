function clustering() {
	if ($.session.hasAppPrivilege("DEV01.live3::Admin")) {
		var sqlstmt;
		var conn;
		var pstmt;
		var pcall;
		var rs;
		conn = $.db.getConnection();
		sqlstmt = 'SET SCHEMA DEV01';
		conn.prepareStatement(sqlstmt).execute();
		sqlstmt = 'TRUNCATE TABLE PAL_RESULTS';
		conn.prepareStatement(sqlstmt).execute();
		sqlstmt = 'TRUNCATE TABLE PAL_CENTERS';
		conn.prepareStatement(sqlstmt).execute();
		sqlstmt = 'CALL _SYS_AFL."DEV01_TweetersClustering"("Tweeters", PAL_PARAMS, ?, ?) with overview';
		pcall = conn.prepareCall(sqlstmt);
		rs = pcall.execute();
		rs = pcall.getResultSet();
		var tables = [];
		while (rs.next()) { 
			tables.push(rs.getString(2));
		}
		pstmt = conn.prepareStatement('INSERT INTO PAL_RESULTS SELECT * FROM ' + tables[0]);
		pstmt.executeUpdate();  
		pstmt.close(); 
		pstmt = conn.prepareStatement('INSERT INTO PAL_CENTERS SELECT * FROM ' + tables[1]);
		pstmt.executeUpdate();  
		conn.commit();
		conn.close();
	} else {
		$.response.setBody("Not authorized."); 
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	} 
} 
