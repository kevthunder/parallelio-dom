#--- Concatened ---
DOM = {}
if module?
  module.exports = DOM
else 
  unless @Parallelio?
  	@Parallelio = {}
  @Parallelio.DOM = DOM
#--- Concatened end ---