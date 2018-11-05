package com.example;

import static spark.Spark.*;
import spark.*;
import com.google.gson.Gson;
import com.google.common.hash.Hashing;
import java.nio.charset.StandardCharsets;

// The main class
public class App {
    public static void main( String[] args ) {

        // Configure Spark
        port(getHerokuAssignedPort());
        staticFiles.location("/public");

        // Routes
        post("/hash", handleHashPost);
    }

    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; //return default port if heroku-port isn't set (i.e. on localhost)
    }

    // The class representing the request body
    public static class RequestBody {
        public String text = null;
    }

    // The class representing the response body
    public static class ResponseBody {
        public String hash = null;
    }

    // The function that handle POST request to /hash
    public static Route handleHashPost = (Request req, Response res) -> {
        try {
            Gson gson = new Gson();
            // Parse the request body
            RequestBody reqBody = gson.fromJson(req.body(), RequestBody.class);
            // Prepare the response
            ResponseBody resBody = new ResponseBody();
            resBody.hash = Hashing.sha256().hashString(reqBody.text, StandardCharsets.UTF_8).toString();
            res.status(200);
            res.type("application/json");
            return gson.toJson(resBody);
        } catch (Exception e) {
            res.status(400);
            return "Invalid input";
        }
    };
}
