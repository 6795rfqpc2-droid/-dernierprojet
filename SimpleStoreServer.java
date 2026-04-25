import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class SimpleStoreServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/products", new ProductsHandler());
        server.setExecutor(null);

        System.out.println("Serveur Java lance sur http://localhost:8080");
        System.out.println("API produits: http://localhost:8080/api/products");
        server.start();
    }

    static class ProductsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(405, -1);
                return;
            }

            String json = """
                [
                  {"id":1,"nom":"Abaya noire classique","categorie":"abaya","prix":39.99},
                  {"id":2,"nom":"Abaya premium beige","categorie":"abaya","prix":54.99},
                  {"id":3,"nom":"Foulard satin rose","categorie":"foulard","prix":12.50},
                  {"id":4,"nom":"Foulard jersey creme","categorie":"foulard","prix":9.90}
                ]
                """;

            byte[] response = json.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "application/json; charset=UTF-8");
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(200, response.length);

            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response);
            }
        }
    }
}
