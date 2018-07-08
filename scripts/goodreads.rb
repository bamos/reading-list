#!/usr/bin/env ruby
#
# Original by @seanosaur at
# https://github.com/seanosaur/reading_list/blob/gh-pages/processing/goodreads.rb
#
# Get a key from: https://www.goodreads.com/api/keys
#
# From the ToS, you must display the Goodreads name everywhere the
# extracted data appears.

require "date"
require "goodreads"
load "scripts/goodreads.secret.rb" # Needs KEY, SECRET, USER_ID constants

client = Goodreads::Client.new(api_key: KEY, api_secret: SECRET)

shelf = client.shelf(USER_ID, "to-read", sort: "author", per_page: 200)
sortedBooks = shelf.books.sort_by do |book|
  [book['book']['authors']['author']['name'], book['book']['title']]
end
File.open("data/to-read.goodreads.yaml", "w") do |file|
  sortedBooks.each do |book|
    file.puts "- author: \"#{book["book"]["authors"]["author"]["name"]}\""
    file.puts "  title: \"#{book["book"]["title"]}\""
  end
end


shelf = client.shelf(USER_ID, "read", sort: "author", per_page: 200)
sortedBooks = shelf.books.sort_by do |book|
  [book['book']['authors']['author']['name'], book['book']['title']]
end
File.open("data/finished.goodreads.yaml", "w") do |file|
  sortedBooks.each do |book|
    file.puts "- author: \"#{book["book"]["authors"]["author"]["name"]}\""
    file.puts "  title: \"#{book["book"]["title"]}\""
    rating = book["rating"]
    if rating then
      file.puts "  rating: #{rating}"
    end
    read_at = book["read_at"]
    if read_at then
      file.puts "  finished: #{Date.parse(read_at).strftime('%Y-%m-%d')}"
    end
  end
end
