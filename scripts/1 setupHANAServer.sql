-- RUN FROM SQL EDITOR AS SYSTEM USER

-- SET PASSWORD POLICY
--ALTER SYSTEM ALTER CONFIGURATION ('indexserver.ini', 'SYSTEM') SET ('password policy', 'force_first_password_change') = 'false' WITH RECONFIGURE;

-- SHOW FRIENDLY ERROR MESSAGES ON DEV SERVER
ALTER SYSTEM ALTER CONFIGURATION ('xsengine.ini', 'SYSTEM') SET ('httpserver', 'developer_mode') = 'true' WITH RECONFIGURE;
--The above statement didn't execute on Trail. It . failed with statement that change not allowed for Tenant database.

-- ENABLE XS DEBUGGING ON DEV SERVER
ALTER SYSTEM ALTER CONFIGURATION ('xsengine.ini', 'SYSTEM') SET ('debugger', 'enabled') = 'true' WITH RECONFIGURE;

-- ENABLE XS JOB SCHEDULING
ALTER SYSTEM ALTER CONFIGURATION ('xsengine.ini', 'SYSTEM') SET ('scheduler', 'enabled') = 'true' WITH RECONFIGURE;

-- DEFAULT SITE (OPTIONAL)
--ALTER SYSTEM ALTER CONFIGURATION ('xsengine.ini', 'SYSTEM') SET ('httpserver', 'root_page') = '/DEV01/live3' WITH RECONFIGURE;

-- CHECK AFL PAL FUNCTIONS INSTALLED
SELECT * FROM SYS.AFL_FUNCTIONS WHERE PACKAGE_NAME='PAL';

-- START SCRIPT SERVER (USED BY AFL PAL)
ALTER SYSTEM ALTER CONFIGURATION ('daemon.ini', 'SYSTEM') SET ('scriptserver', 'instances') = '1' WITH RECONFIGURE;
