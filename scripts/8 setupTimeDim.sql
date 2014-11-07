

/********* Begin Procedure Script ************/ 
 BEGIN 
 	 var_out = 
SELECT 
"id",
month("created")||'/'||dayofmonth("created")||' '||right('0'||hour("created"),2) AS BASKETHOUR,
month("created")||'/'||dayofmonth("created")||' '||right('0'||hour("created"),2)||':'||right('0'||floor(minute("created")/15)*15,2) AS BASKET15MIN,
month("created")||'/'||dayofmonth("created")||' '||right('0'||hour("created"),2)||':'||right('0'||floor(minute("created")/30)*30,2) AS BASKET30MIN 
FROM "DEV01"."Tweets"
order by 1;

END 
/********* End Procedure Script ************/

/********* Begin Procedure Script ************/
 BEGIN
 
ce_tab = CE_COLUMN_TABLE("DEV01"."Tweets");
 
ce_proj1 = CE_PROJECTION(:ce_tab, [
                "id",
                "created",
                CE_CALC('midstr(string("created"),6,8)', VARCHAR(20)) AS BASKETHOUR,
                CE_CALC('component("created", 5)/15', INTEGER) AS NMINUTE15,
                CE_CALC('component("created", 5)/30', INTEGER) AS NMINUTE30            
        ]);
 
ce_proj2 = CE_PROJECTION(:ce_proj1, [
                "id",
                BASKETHOUR,
                NMINUTE15,
                NMINUTE30,
                CE_CALC('"BASKETHOUR" + '':'' + rightstr(''0''+string(15 * "NMINUTE15"),2)', VARCHAR(20)) AS BASKET15MIN,
                CE_CALC('"BASKETHOUR" + '':'' + rightstr(''0''+string(30 * "NMINUTE30"),2)', VARCHAR(20)) AS BASKET30MIN
        ]);       
        
 var_out = CE_JOIN (:ce_tab, :ce_proj2, ["id"], ["id", BASKETHOUR,BASKET15MIN,BASKET30MIN]);
 
END 
/********* End Procedure Script ************/