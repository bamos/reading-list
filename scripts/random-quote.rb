#!/usr/bin/env ruby

require 'yaml'

class Quote
  def initialize(q, book)
    @q = q
    @book = book
  end

  def display
    puts "\"#{@q['content'].strip()}\""
    puts "\nFrom page #{@q['page']} of \"#{@book['title']}\" by #{@book['author']}."
  end
end

books = YAML.load_file('data/finished.yaml')

quotes = []
books.each { |book|
  if book.has_key?('quotes')
    book['quotes'].each { |quote|
      quotes.push(Quote.new(quote, book))
    }
  end
}

randomQuote = quotes.sample
randomQuote.display
