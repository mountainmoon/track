BINS = ./node_modules/.bin
DUO = $(BINS)/duo
UGLIFYJS = $(BINS)/uglifyjs
SRC = $(wildcard lib/*.js)

track.js: $(SRC)
	@$(DUO) --stdout --global track lib/index.js > $@
	@cp $@ test/$@

track.min.js: track.js
	@$(UGLIFYJS) $< --output $@
