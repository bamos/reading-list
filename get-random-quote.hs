#!/usr/bin/env runhaskell

{-|
This Haskell script prints a random quote from my quote
collection in `data/finished.yaml`.

I email myself quotes every few days with a cron job piping
the output of this to a command-line mailing program (mutt).

Appropriate packages can be installed with `cabal`.

Brandon Amos
http://bamos.github.io
2015/04/24
-}

{-# LANGUAGE DeriveGeneric, DeriveAnyClass #-}

import Data.Aeson -- For parsing YAML with FromJSON.
import Data.Maybe (catMaybes, fromJust)
import Data.Random (sample)
import Data.Random.Extras (choice) -- From `random-extras` package.
import Data.Yaml (decode) -- From `yaml` package.
import GHC.Generics
import qualified Data.ByteString.Char8 as BS

data Quote =
  Quote {
         -- String for Roman numerals.
         -- Warning: Integer page numbers cause silent
         --   parsing errors.
         page :: String
        ,content :: String}
  deriving (Show,Generic,FromJSON)

data Book =
  Book {author :: String
       ,title :: String
       ,finished :: String
       ,rating :: Int
       ,quotes :: Maybe [Quote]
       ,notes :: Maybe [String]}
  deriving (Show,Generic,FromJSON)

-- Produce a formatted string for a quote.
getQuote :: Book -> Quote -> String
getQuote book quote = concat [show $ content quote
                             ,"\n\nFrom page "
                             ,page quote
                             ," of "
                             ,show $ title book
                             ," by "
                             ,author book]

-- Format all of the quotes of a book.
getQuotes :: Book -> Maybe [String]
getQuotes book = (map $ getQuote book) <$> quotes book

getAllQuotes :: [Book] -> [String]
getAllQuotes books = concat . catMaybes . map getQuotes $ books

main = do
  yamlData <- BS.readFile "data/finished.yaml"
  let mBooks = Data.Yaml.decode yamlData :: Maybe [Book]
  case mBooks of
    Just books -> putStrLn =<< randomQuote
      where randomQuote = sample $ choice quotes
            quotes = getAllQuotes $ books
    Nothing -> putStrLn "Unable to parse YAML document."
