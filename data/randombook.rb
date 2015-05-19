#!/usr/bin/env ruby
#
# Original by @seanosaur at
# https://github.com/seanosaur/reading_list/blob/gh-pages/data/randombook.rb

require 'yaml'
books = YAML.load_file('to-read.yaml')
book_list = books.sample(5)
puts "Choose a book:"
puts "1. #{book_list[0]['author']} - #{book_list[0]['title']}"
puts "2. #{book_list[1]['author']} - #{book_list[1]['title']}"
puts "3. #{book_list[2]['author']} - #{book_list[2]['title']}"
puts "4. #{book_list[3]['author']} - #{book_list[3]['title']}"
puts "5. #{book_list[4]['author']} - #{book_list[4]['title']}"
puts "Input chosen book number: "
book_number = gets
chosen_book = book_list[book_number.to_i - 1]
open('up-next.yaml', 'w') { |f|
  f << "- author: #{chosen_book['author']}\n"
  if /:/.match(chosen_book['title']) or /'/.match(chosen_book['title'])
    f << "  title:  '#{chosen_book['title'].gsub(/'/, '&#39;')}'\n"
  else
    f << "  title:  #{chosen_book['title']}\n"
  end
}
