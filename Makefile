BINS = ./node_modules/.bin
DUO = $(BINS)/duo
UGLIFYJS = $(BINS)/uglifyjs

detect.js:
    @$(DUO) --stdout --standalone track lib/index.js > $@

delect.min.js: detect.js
    @$(UGLIFYJS) detect.js
