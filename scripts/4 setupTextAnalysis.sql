-- RUN FROM SQL EDITOR AS DEV01 USER

-- CREATE TEXT ANALYSIS INDEX ON TWEETS
CREATE FULLTEXT INDEX "tweets" ON "Tweets"("text") 
	CONFIGURATION 'EXTRACTION_CORE_VOICEOFCUSTOMER'
	LANGUAGE COLUMN "lang" 
	LANGUAGE DETECTION ('EN','FR','DE','ES','ZH') 
	TEXT ANALYSIS ON
	;
