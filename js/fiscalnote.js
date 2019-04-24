d3.json("bill_topics_list.json", function(data) {
//Parse out all bill topics_________________________________
  var bills = [];

  for (var i = 0; i < data.length; i++) {
    var d = new Date(data[i].date);
    var year = parseInt(d.getFullYear());

    var term;
    if (year >= 2001 && year <=2002) { term = '2001 - 2003' };
    if (year >= 2004 && year <= 2004) { term = '2003 - 2005' };
    if (year >= 2005 && year <= 2006) { term = '2005 - 2007' };
    if (year >= 2007 && year <= 2009) { term = '2007 - 2012' };
    if (year >= 2009 && year <= 2010) { term = '2009 - 2011' };
    if (year >= 2011 && year <= 2012) { term = '2011 - 2013' };
    if (year >= 2013 && year <= 2014) { term = '2013 - 2014' };

    var billone = data[i][1];
    var billtwo = data[i][2];
    var billthree = data[i][3];
    var billfour = data[i][4];
    var billfive = data[i][5];

    if (billone != null) { billOne(year, billone) };
    if (billtwo != null) { billTwo(year, billtwo) };
    if (billthree != null) { billThree(year, billthree) };
    if (billfour != null) { billFour(year, billfour) };
    if (billfive != null) { billFive(year, billfive) };

    function billOne(year, billone) {
      bills.push({
        "Year": year,
        "Bill": billone,
        "Term": term
      })
    };

    function billTwo(year, billtwo) {
      bills.push({
        "Year": year,
        "Bill": billtwo,
        "Term": term
      })
    };

    function billThree(year, billthree) {
      bills.push({
        "Year": year,
        "Bill": billthree,
        "Term": term
      })
    };

    function billFour(year, billfour) {
      bills.push({
        "Year": year,
        "Bill": billfour,
        "Term": term      })
    };

    function billFive(year, billfive) {
      bills.push({
        "Year": year,
        "Bill": billfive,
        "Term": term
      })
    };

  }

  // console.log("bills: ", bills)

//__________________________________________________________

//Get top bill topics for each term_________________________

var topbills = [];

var topbills1 = bills.filter(function(d, j) {
    return d.Year >= 2001 && d.Year <= 2004
  });

var topbills1count = d3.nest()
    .key(function(d) { return d.Bill; })
    .sortKeys(d3.ascending)
    .entries(topbills1);

var topbills1priority = topbills1count.filter(function(d, j) {
    return d.values.length >= 10
  });


var topbills2 = bills.filter(function(d, j) {
    return d.Year >= 2005 && d.Year <= 2008
  });

var topbills2count = d3.nest()
    .key(function(d) { return d.Bill; })
    .sortKeys(d3.ascending)
    .entries(topbills2);

var topbills2priority = topbills2count.filter(function(d, j) {
    return d.values.length >= 10
  });


var topbills3 =  bills.filter(function(d, j) {
         return d.Year >= 2009 && d.Year <= 2012
        });

var topbills3count = d3.nest()
    .key(function(d) { return d.Bill; })
    .sortKeys(d3.ascending)
    .entries(topbills3);

var topbills3priority = topbills3count.filter(function(d, j) {
    return d.values.length >= 10
  });


var topbills4 =  bills.filter(function(d, j) {
     return d.Year >= 2012
   });

var topbills4count = d3.nest()
   .key(function(d) { return d.Bill; })
   .sortKeys(d3.ascending)
   .entries(topbills4);

var topbills4priority = topbills4count.filter(function(d, j) {
   return d.values.length >= 10
 });


topbill1keys = topbills1priority.map(function(d){return d.key;})

for (var i=0; i < topbill1keys.length; i++) {
    topbills.push( topbill1keys[i] );
}

topbill2keys = topbills2priority.map(function(d){return d.key;})

for (var i=0; i < topbill2keys.length; i++) {
    topbills.push( topbill2keys[i] );
}


topbill3keys = topbills3priority.map(function(d){return d.key;})

for (var i=0; i < topbill3keys.length; i++) {
    topbills.push( topbill3keys[i] );
}


topbill4keys = topbills4priority.map(function(d){return d.key;})

for (var i=0; i < topbill4keys.length; i++) {
    topbills.push( topbill4keys[i] );
}


//__________________________________________________________


//Top bill parsed data______________________________________
var topbilldata = bills.filter(function(d, j) {
    return topbills.includes(d.Bill)
  });

//__________________________________________________________


//Get top bill final data set, fill in data gaps________________________________

seriesBills = d3.nest()
  .key(function(d) { return d.Bill; })
  .sortKeys(d3.ascending)
  .entries(topbilldata);

var billTopics = seriesBills.map(function(d){return d.key;})

var seriesTerms = d3.nest()
  .key(function(d) { return d.Term; })
  .sortKeys(d3.ascending)
  .entries(topbilldata);


var data = [];

for(var i = 0; i < seriesTerms.length; i++){

  var currTerm = seriesTerms[i].values;

  currBills = d3.nest()
    .key(function(d) { return d.Bill; })
    .sortKeys(d3.ascending)
    .entries(currTerm);


    for(var j = 0; j < currBills.length; j++){

      data.push({
        "term": currBills[j].values[0].Term,
        "bill": currBills[j].key,
        "value": currBills[j].values.length
      })

    };
  };


  for(var i = 0; i < seriesTerms.length; i++){

    var currTerm = seriesTerms[i].values;
    var currbillmap = currTerm.map(function(d){return d.Bill;})
    var billdiff = $(billTopics).not(currbillmap).get();

      for(var j =0; j < billdiff.length; j++){
        var billid = billTopics.indexOf(billdiff[j])

          data.push({
            "term": currTerm[i].Term,
            "bill": billdiff[j],
            "value": 0
          })
       };
    };

//Sort with added zero value data so viz renders properly___
    data.sort(function(x, y){
               return d3.ascending(x.bill, y.bill);
    });

    data.sort(function(x, y){
               return d3.ascending(x.term, y.term);
    });
//__________________________________________________________




//Data passed to chart______________________________________

var winwidth = window.innerWidth;
//__________________________________________________________


//Chart Window functions______________________________________

 call_bills_by_term_heatmap = function() {
     bills_by_term_heatmap(data, winwidth);
 }

call_bills_by_term_heatmap();

function winResize() {
     winwidth = window.innerWidth;
     $timeout( function(){ $scope.bills_by_term_heatmapp(); }, 100);
 }
 //_____________________________________________________________


function bills_by_term_heatmap(data, winwidth) {


   $("#viz").empty();

   var itemSize = 24,  cellSize = itemSize - 2,
       margin = {top: window.innerHeight/2.5, right: 140, bottom: 160, left: 120},
       width = window.innerWidth - margin.left - margin.right,
       height = window.innerHeight - 140 - margin.top - margin.bottom;


  //Tooltip
   function removePopoversPoint() {
       $('.popover').each(function () {
           $(this).remove();
       });
   }

   function showPopoverPoint(d) {
       $(this).popover({
           title: "<center>" + d.term + "</center><center>" + d.bill + "</center>",
           placement: 'auto top',
           container: '#viz',
           trigger: 'manual',
           html: true,
           content: function () {
               return "<center>" + d.value + " Bills</center>";
           }
       });
       $(this).popover('show')
   }

   function zoom() {
    	svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);



   //Build Chart
   var data = data.map(function( item ) {
          var newItem = {};
          newItem.term = item.term;
          newItem.bill = item.bill;
          newItem.value = item.value;
          newItem.sort =  item.term + item.bill;
          newItem.sort_id = parseFloat(newItem.value + "." + (item.id + 1));


          return newItem;
      })

      var x_elements = d3.set(data.map(function( item ) { return item.bill; } )).values(),
          y_elements = d3.set(data.map(function( item ) { return item.term; } )).values();


      var rowdata = d3.nest()
          .key(function(d) { return d.term; })
          .entries(data);

      var row_number = y_elements.length;
      var col_number = x_elements.length;

      var xScale = d3.scale.ordinal()
           .domain(x_elements)
           .rangeBands([0, x_elements.length * itemSize]);

      var xAxis = d3.svg.axis()
           .scale(xScale)
           .tickSize(0)
           .tickFormat(function (d) { return d; })
           .orient("top");

      var yScale = d3.scale.ordinal()
           .domain(y_elements)
           .rangeBands([0, y_elements.length * itemSize]);

      var yAxis = d3.svg.axis()
           .scale(yScale)
           .tickSize(0)
           .tickFormat(function (d) { return d; })
           .orient("left");

      var color = d3.scale.linear()
        .domain([0,30])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb('#F3E5F5'), d3.rgb('#4A148C')]);

      var svg = d3.select("#viz").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .call(zoomListener)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var rowSortOrder = false;
      var colSortOrder = false;

      var rowLabels = svg.append("g")
                 .attr("class", "y axis")
                 .style("fill", "none")
                 .style("stroke", "#000")
                 .attr("class", "rowLabels")
                 .selectAll(".rowLabel")
                 .data(y_elements)
                 .enter().append("text")
                 .text(function(d) { return d; })
                 .attr("x", 0)
                 .attr("y", function(d, i) { return (i * itemSize); })
                 .style("text-anchor", "end")
                 .attr("transform", function(d, i) {return "translate(-3," + itemSize / 1.5 + ")";})
                 .attr("class", "rowLabel mono")
                 .attr("id", function(d, i) { return "rowLabel_" + i; })
                 .style("font-size", "14px")
                 .style("font-family", "sans-serif")
                 .style("fill", "#000")
                 .style("stroke", "none")
                 .on("click", function(d, i) {
                     rowSortOrder = !rowSortOrder;
                     sortByValues("r", i, rowSortOrder);
                     d3.select("#order").property("selectedIndex", 0);
                 });

       var colLabels = svg.append("g")
               .attr("class", "x axis")
               .style("fill", "none")
               .style("stroke", "#000")
               .attr("class", "colLabels")
               .selectAll(".colLabel")
               .data(x_elements)
               .enter().append("text")
               .text(function(d){ return d; })
               .attr("x", 0)
               .attr("y", function(d, i) { return (i * itemSize); })
               .style("font-size", "10px")
               .style("font-family", "sans-serif")
               .style("fill", "#000")
               .style("stroke", "none")
               .style("text-anchor", "left")
               .attr("transform", function(d, i) { return "translate(" + itemSize / 2 + ", -3) rotate(-90) rotate(45, 0, " + (i * itemSize) + ")"; })
               .attr("class", "colLabel mono")
               .attr("id", function(d, i) { return "colLabel_" + i; })
               .on("click", function(d, i) {
                   colSortOrder = !colSortOrder;
                   sortByValues("c", i, colSortOrder);
                   d3.select("#order").property("selectedIndex", 0);
               });

          var row = svg.selectAll(".row")
               .data(rowdata)
               .enter().append("g")
               .attr("id", function(d, i) { return i; })
               .attr("class", "row")
               .attr("transform", function (d) {
                     return "translate( 0," + (yScale(d.key) + itemSize) + ")";  });


          var heatmap = row.selectAll(".cell").data( function(d) { return d.values; })
          // console.log("Heatmap: ", heatmap)

          heatmap.enter().append('rect')
                 .attr('class', 'cell')
                 .attr('width', cellSize)
                 .attr('height',cellSize)
                 .attr("x", function(d, i) { return i * itemSize; })
                 .attr("y", function(d, i) { return y_elements.indexOf(d.key) * itemSize; })
                 .attr("rx", 2)         // set the x corner curve radius
                 .attr("ry", 2)         // set the y corner curve radius
                 .attr("class", function(d, i, j) { return "cell bordered cr" + j + " cc" + x_elements.indexOf(d.bill); })
                 .attr("row", function(d, i, j) { return j; })
                 .attr("col", function(d, i) { return i; })
                 .attr('fill', function(d) { return color(d.value); })
                 .style('stroke',  "#E6E6E6")
                 .style("stroke-width", "1px")

                 .style("stroke-opacity", .8)
                 .on("mouseover", function (d) {showPopoverPoint.call(this, d); })
                 .on("mouseout", function (d) { removePopoversPoint(); });



           function sortByValues(rORc, i, sortOrder) {
                     var t = svg.transition().duration(1000);
                     var values = [];
                     var sorted;
                     d3.selectAll(".c" + rORc + i)
                         .filter(function(d) {
                             if (d != null) values.push(d.sort_id);
                             else values.push(-999); // to handle NaN
                         });
                     console.log("VALUES: ",values);
                     if (rORc == "r") { // sort on cols
                         sorted = d3.range(col_number).sort(function(a, b) {
                             if (sortOrder) {
                                 return values[b] - values[a];
                             } else {
                                 return values[a] - values[b] ;
                             }
                         });
                         t.selectAll(".cell")
                             .attr("x", function(d) {
                                 var col = parseInt(d3.select(this).attr("col"));
                                 return ((sorted.indexOf(col) * itemSize));
                             });


                         t.selectAll(".colLabel")
                             .attr("y", function(d, i) {
                                 return ((sorted.indexOf(i) * itemSize));
                             })
                             .attr("transform", function(d, i) {
                                 return "translate(" + itemSize / 2 + ", -3) rotate(-90) rotate(45, 0, " + (sorted.indexOf(i) * itemSize) + ")";
                             });
                     } else { // sort on rows
                         sorted = d3.range(row_number).sort(function(a, b) {
                             if (sortOrder) {
                               return values[b] - values[a];
                           } else {
                               return values[a] - values[b] ;
                             }
                         });

                         t.selectAll(".cell")
                             .attr("y", function(d, i) {
                                 var row = parseInt(d3.select(this).attr("row"));
                                 return  (sorted.indexOf(row));
                             });
                         t.selectAll(".row")
                             .attr("transform", function (d, i) {
                                 return "translate( 0," + sorted.indexOf(i) * itemSize + ")";
                             });

                         t.selectAll(".rowLabel")
                             .attr("y", function(d, i) {
                                 return sorted.indexOf(i) * itemSize;
                             })
                             .attr("transform", function(d, i) {
                                 return "translate(-3," + itemSize / 1.5 + ")";
                             });
                     }
                 }

  }//End call chart function
}); //End of viz
