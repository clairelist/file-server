IF YOU ARE RUNNING THIS PROJECT:
--YOU WILL have to create a local uploads directory (server expects the exact name to be 'uploads')
--YOU WILL have to set the following environment variables in your .env file::
DATABASE_URL=mongodb://home_port/mongodb_name
PORT=whatever
WITHOUT PORT being defined the code will fail! 