const Client = require('ssh2-sftp-client');
const config = require('./config.json');

const sftp_config = {
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password
}
const path = config.remotePath;

const sftp = new Client();

const connect = async () => {
    await sftp.connect(sftp_config);
    console.log('SFTP server connected');

    // List fileNames before Upload
    const file = await sftp.list(path);
    for (const i in file) {
        console.log(file[i].name);
    }

    //Upload Files
    await sftp.put('./files/b.txt', path + '/b.txt');
    console.log('Upload Completed');

    // List fileNames before Upload
    const file_after_upload = await sftp.list(path);
    for (const a in file_after_upload) {
        console.log(file_after_upload[a].name);
    }
};

connect().then(() => console.log('executed'));