var years = [1968,1970,1970,1971,1973,1973,1974,1976,
1976,1977,1977,1978,1980,1981,1983,1984,
1984,1985,1986,1987,1987,1987,1988,1989,
1989,1990,1990,1990,1991,1991,1991,1991,
1992,1992,1993,1993,1993,1994,1995,1995,
1996,1996,1996,1997,1997,1997,1998,1998,
1999,1999,2000,2000,2000,2001,2001,2002,
2002,2003,2004,2004,2005,2005,2005,2006,
2007,2007,2008,2008,2009,2010,2010,2010,
2011,2011,2011,2012,2012,2012,2013,2013,2013,2013,2014,2015,2015,2015,2016,
];



var data = [86,17,73,40,
98,88,97,41,99,47,67,93,97,75,90,89,60,98,65,100,
80,78,96,64,47,88,29,96,76,69,65,71,87,67,75,78,
96,39,80,86,74,38,80,85,87,72,68,38,69,43,43,84,
41,73,33,48,27,4,35,38,4,46,13,54,21,76,19,51,
46,72,10,50,25,7,70,92,51,29,46,7,29,11,9,60,
26,61,11];

var margin = {
  top: 30,
  right: 30,
  bottom: 40,
  left: 50
}



var titles = ["Greetings","bloody mama","hi mom!","born to win",
"mean streets","bang the drum slowly","the godfather part 2","the last tycoon",
"taxi driver","1900","new york new york","the deer hunter",
"raging bull","true confessions","the king of comedy","once upon a time in america",
"falling in love","brazil","the mission","dear america",
"the untouchables","angel heart","midnight run","jacknife",
"we're no angels","awakenings","stanley and iris","goodfellas",
"cape fear","mistress","guilty by suspicion","backdraft",
"thunderheart","night and the city","this boy's life","mad dog and glory",
"a bronx tale","mary shelley's frankenstein","casino","heat",
"sleepers","the fan","marvin's room","wag the dog",
"jackie brown","cop land","ronin","great expectations",
"analyze this","flawless","the adventures of rocky and bullwinkle",
"meet the parents","men of honor","the score","15 minutes",
"city by the sea","analyze that","godsend","shark tale",
"meet the fockers","the bridge of san luis rey",
"rent","hide and seek","the good shepherd","arthur and the invisibles",
"captain shakespeare","rightous kill","what just happened?","everybody's fine",
"machete","little fockers","stone","killer elite",
"new years eve","limitless","silver linings playbook","being flynn",
"red lights","last vegas","the big wedding","grudge match",
"killing season","the bag man","joy","heist",
"the intern","dirty grandpa"];

  var height = 200 - margin.top - margin.bottom,
      width = 400 - margin.right - margin.left,
      animateDuration = 700,
      animateDelay = 30;

  var tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("background", "#f4f4f4")
    .style("padding", "5 15px")
    .style("border", "1px #333 solid")
    .style("border-radius", "5px")
    .style("opacity", "0")
  
  var yscale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, height])
  
  var xscale = d3.scale.ordinal()
  .domain(d3.range(0, data.length))
  .rangeBands([0, width])
  
  var colors = d3.scale.linear()
  .domain([0, data.length])
  .range(["purple", "orange"])
  
  var myChart = d3.select(".chart").append("svg")
  .attr("height", height + margin.top + margin.bottom)
  .attr("width", width + margin.right + margin.left)
  .append("g")
  .attr("transform", "translate("+margin.left+","+margin.top+")")
  .style("background", "pink")
  .style("padding", "60 60px")
  .style("border", "5px black solid")
  .style("border-radius", "5px")
 
  .selectAll("rect")
  .data(data)
  .enter().append("rect")
  .style("fill", function(d, i){
    return colors(i)
  })
  .attr("height", 0)
  .attr("width", xscale.rangeBand(data))
  .attr("x", function(d, i){
    return xscale(i)
  })
  .attr("y", height)

.on('mouseover', function(d){
    tooltip.transition()
    .style("opacity", 1)
    
    tooltip.html(d)
      .style("left", (d3.event.pageX)+"px")
      .style("top", (d3.event.pageY+"px"))
    d3.select(this).style("opacity", 0.5)
  })
  .on("mouseout", function(d){
    tooltip.transition()
      .style("opacity", 0)
      d3.select(this).style("opacity", 1)
  })

myChart.transition()
  .attr("height", function(d){
  return yscale(d)
})
.attr("y", function(d){
  return height - yscale(d)
})
.duration(animateDuration)
.delay(function(d, i){
  return i * animateDelay
})
  .ease("elastic")


  var vscale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([height, 0])
  
  var hscale = d3.scale.ordinal()
  .domain(d3.range(0, data.length))
  .rangeBands([0, width])
  
  
  var vaxis = d3.svg.axis()
  .scale(vscale)
  .orient("left")
  .ticks(5)
  .tickPadding(5)
  
  var vguide = d3.select("svg").append("g")
  vaxis(vguide)
vguide.attr("transform", "translate("+margin.left+","+margin.top+")")
vguide.selectAll("path")
.style("fill", "none")
.style("stroke", "#000")
vguide.selectAll("line")
.style("stroke", "#000")





 var haxis = d3.svg.axis()
  .scale(hscale)
  .orient("bottom")
  .tickValues(hscale.domain().filter(function(d, i){
    return !(i % (data.length/6));
  }));
 
 
 
  var hguide = d3.select("svg").append("g")
  haxis(hguide)
hguide.attr("transform", "translate("+margin.left+","+(height + margin.top)+")")
hguide.selectAll("path")
.style("fill", "none")
.style("stroke", "#000")
hguide.selectAll("line")
.style("stroke", "#000")
