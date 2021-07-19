# my-service-poller

In order to run my service poller app you will need to run the frontend application, and the backend service application separately.

To start the backend service you can either do it by running the jar file "service-poller-0.0.1-SNAPSHOT.jar (which you can find in the ”service-poller” map), and then start it in a terminal with the commando: java -jar <the path of the jar file>. Or you can do it by open the whole ”service-poller” project and run it through starting the main class ”ServicePollerApplication.java” in an editor (I'm using Intellij).

To run the frontend application with the UI in your browser you can either clone the ”web-app-dist” map, then in your terminal go to the path of the map, and then first write the commando: ”npm install”, and then to run it ”npm start”. When the service start you can view the UI at http://localhost:4200. Or you can clone the whole frontend project (which you can find in the ”service-poller-webapp” map), and then build and run it through your editor, with the commando "npm start" or "ng serve --open". 

obs:  If you find issues to connect to MongoDB and get errors regarding mongo in your consol when you have started the backend service the problem can be that your JDK doesn’t comply with it You should be able to solve this by adding ”-Djdk.tls.client.protocols=TLSv1.2” to your configurations in your editor the PollerApplication Run/Debug configs.
