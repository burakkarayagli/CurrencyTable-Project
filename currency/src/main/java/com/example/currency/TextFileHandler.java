package com.example.currency;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Random;

@Component
public class TextFileHandler {

    public static final BigDecimal VOLATILITY = new BigDecimal("0.0001");
    private final String FILE_PATH = "Currency2.json";
    private final ObjectMapper objectMapper = new ObjectMapper();
    public File jsonFile = new ClassPathResource(FILE_PATH).getFile();

    public TextFileHandler() throws IOException {
    }

    public void updateJsonFile() throws IOException {

        JsonNode jsonNode = getJsonFileContents();

        //iterate over the json node with jsonnode.elements() and update the bid and ask values

        jsonNode.elements().forEachRemaining(node -> {
            String currencyPair = node.get("currency_pair").asText();
            // Get the old bid and ask values
            BigDecimal oldBid = new BigDecimal(node.get("bid").asText());
            BigDecimal oldAsk = new BigDecimal(node.get("ask").asText());

            // Generate a new bid and ask value
            BigDecimal newBid;
            BigDecimal newAsk;
            try {
                newBid = randomCurrency(oldBid, VOLATILITY);
                newAsk = randomCurrency(oldAsk, VOLATILITY);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }


            ((ObjectNode) node).put("bid", newBid);
            ((ObjectNode) node).put("ask", newAsk);
        });

        //Write the updated json to the file
        objectMapper.writeValue(jsonFile, jsonNode);
    }

    //write a method returns the json file as jsonNode
    public JsonNode getJsonFileContents() throws IOException {
        return objectMapper.readTree(jsonFile);
    }


    public BigDecimal randomCurrency(BigDecimal oldCurrency, BigDecimal VOLATILITY) throws IOException {

        // Generate a random number between -1 and 1
        Random rand = new Random();
        BigDecimal randomValue = new BigDecimal(rand.nextDouble() * 2 - 1);

        return oldCurrency.add(randomValue.multiply(VOLATILITY));
    }

}
