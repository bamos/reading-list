#!/usr/bin/env ruby
#
# Original by @seanosaur at
# https://github.com/seanosaur/reading_list/blob/gh-pages/processing/randombook.rb

require 'yaml'

num_choices = 5

def prettyBook(b)
  "#{b['author']} - #{b['title']}"
end

books = YAML.load_file('data/to-read.yaml')
book_list = books.sample(num_choices)
puts "#{num_choices} random books I could be reading:\n\n"
(1..num_choices).map { |n|
  puts "#{n}. #{prettyBook(book_list[n-1])}"
}
