// Use D3 library to read in samples.json
//read in data -> use server
//define a variable for file path 
var file_path = '../../samples.json'

d3.json(file_path).then(function(data){
  console.log(data);
  dropdown(data);
});

// wait for d3 promise to be fulfulled
//for each item in names attribute, creat a option elemnt in 
//html under the select element
// drop down menu
//program optionChanged to match html
function dropdown(sampleData) {
  sampleData['names'].forEach(name=>{
    var newOption = d3.select('#selDataset').append('option')
    newOption.text(name);
    newOption.property('value', name);
  });
};

//program to set the newly selected value
function optionChanged(selected) {
  console.log(selected);
    buildBar(selected);
    buildTable(selected);
};
// could do it this way but already coded for us in the html 
// d3.select('#selDataset').on('change', optionChanged(this.value));

// build bar chart based on selection
//take parameter of the selection(int)
//filter down to top 10 OTUs
//inverse sort
function buildBar(sampleId) {
  d3.json(file_path).then(function(data){
    var samples=data['samples'];
    var selectedSample=samples.filter(sample => sample.id==sampleId)[0];
    // console.log(selectedSample)
    traceBar={
      type: 'bar',
      y: selectedSample['otu_ids'].map(otu_ids=>'OTU '+otu_ids.toString()).slice(0,10).reverse(),
      x: selectedSample['sample_values'].slice(0,10).reverse(),
      text: selectedSample['otu_labels'].slice(0,10).reverse(),
      orientation: 'h'
    };
    // console.log(trace);
    Plotly.newPlot('bar', [traceBar])


    traceBubble={
      type: 'scatter',
      x: selectedSample['otu_ids'],
      y: selectedSample['sample_values'],
      mode: 'markers',
      marker: {
        size: selectedSample['sample_values'].map(sample_value=>sample_value/2),
        color: selectedSample['otu_ids'],
        colorscale: 'Earth'
      }
    };
    Plotly.newPlot('bubble', [traceBubble])

  });
};

//build the metada from json
//d3.json-> read the date from samples.json again
// forEach object.entries add new lih6
//
function buildTable(sampleId) {
  d3.json(file_path).then(function(data){
    var metadata=data['metadata'];
    var selectedMetadata=metadata.filter(meta=>meta['id']==sampleId)[0];
    // console.log(selectedMetadata);
    var panel = d3.select('#sample-metadata');
    panel.html('');
    Object.entries(selectedMetadata).forEach(([meta_key, meta_value])=>{
      panel.append('h5')
        .text(`${meta_key}: ${meta_value}`);
    });
  });
};





// d3.json("data/samples.json").then ((data) => {
//   console.log(data);

// d3.json('samples.json').then(data =>{
//   console.log(data);
//   sampleData = data;
//   plot(sampleData);
// });

// //Do we need to unpack the data, or did it come over ok?
// function unpack(dataArr, index) {
//     return dataArr.map(row=>row[index])
//     console.log(dataArr)
// };

// CAN I SEE MY ELEMENTS INDIVIDUALLY
// d3.select("ul").selectAll("li");

// d3.select("ul").selectAll("li")
//     .each(function(d, i) {
//       console.log("element", this);
//       console.log("data", d);
//       console.log("index", i);
//     });

// function plot(inputData) {
//   console.log(inputData);
// };

// // //   5. Create your trace.
//LOOK AT ACTIVITY 15.3.6
  //  Create the Traces
  // var trace1 = {
  //   x: data.organ,
  //   y: data.survival.map(val => Math.sqrt(val)),
  //   type: "box",
  //   name: "Cancer Survival",
  //   boxpoints: "all"
  // };

  // // Create the data array for the plot
  // var data = [trace1];

  // // Define the plot layout
  // var layout = {
  //   title: "Square Root of Cancer Survival by Organ",
  //   xaxis: { title: "Organ" },
  //   yaxis: { title: "Square Root of Survival" }
  // };

  // // Plot the chart to a div tag with id "plot"
  // Plotly.newPlot("plot", data, layout);
// });

// };

//CODE FOR BAR CHART 

// Filter the top 15 cities with a population increase greater than 15,000
//  and then graph each city on the x-axis and the respective population on the y-axis.

// 1. Use the filter method to create a custom filtering function
//  that returns the cities with a population increase greater than 15,000.

// function filterCities(city) {
//     return parseInt(city.Increase_from_2016) > 15000;
//   }
  
  // // 2. Use filter() to pass the function as its argument
  // var filteredCities = top15Cities.filter(filterCities);
  
  // //  Check to make sure your filtered your cities.
  // console.log(filteredCities);
  
//   // 3. Use the map method with the arrow function to return all the filtered cities.
//   var cities = filteredCities.map(city => city.City);
  
//   //  Check your filtered cities
//   console.log(cities);
  
//   // 4. Use the map method with the arrow function to return all the filtered cities population.
//   var population = filteredCities.map(city => city.population);
  
//   //  Check the populations of your filtered cities
//   console.log(population);
  
  





//  CODE FOR BUBBLE CHART

// var trace1 = {
//     x: [1, 2, 3, 4],
//     y: [10, 11, 12, 13],
//     mode: 'markers',
//     marker: {
//       color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
//       opacity: [1, 0.8, 0.6, 0.4],
//       size: [40, 60, 80, 100]
//     }
//   };
  
//   var data = [trace1];
  
//   var layout = {
//     title: 'Marker Size and Color',
//     showlegend: false,
//     height: 600,
//     width: 600
//   };
  
//   Plotly.newPlot('myDiv', data, layout);