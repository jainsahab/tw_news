tw_news
=======

Broadcast ThoughtWorks Events, Blogs etc

### Run Locally
* [NodeJS](https://nodejs.org/en/download/) should be installed in order to run the application server.
* This app requires to have a wordpress website installed from which it can fetch the post as RSS feeds and broadcast them. [Bitnami wordpress Stack](https://bitnami.com/stack/wordpress) is a fastest way to setup a wordpress website locally IMO. This consists of the Apache Web Server and MySQL database which is required by a wordpress website. After the successful installation process, there is an application **manager-osx** installed to customize the site settings.
* Determine the Apache Web Server **port** number from **Manage Servers** tab >> select **Apache Web Server** option >> and click **configure**.
* Clone this repository and edit the `config.json` file with the port number we determined earlier.
```javascript
{
	"feedUrls" : [
		"http://127.0.0.1:{port number}/wordpress/feed/"
	]
}
```
* Now navigate to this project directory and run the following commands.
`npm install` and `node app.js`


Now, You should be having a running application. Keep Broadcasting !!!!

---