BINS = ./node_modules/.bin
DUO = $(BINS)/duo
UGLIFYJS = $(BINS)/uglifyjs

track.js:
	@$(DUO) --stdout --standalone track lib/index.js > $@

track.min.js: track.js
	@$(UGLIFYJS) $< --output $@
