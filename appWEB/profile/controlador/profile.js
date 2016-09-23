/* global go, NaN */
angular.module('AdminSqlServer')
.controller("profileCtrl", function($scope,$http,$location,serveData)
{
    $scope.get_table_and_column = function(){
        $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=GetTable_and_Column";
        console.log("Estoy en profile" + serveData);
        console.log(serveData);
        $scope.data = {dbName: serveData.dbName,userName: serveData.userName, password: serveData.password}; 
        
        $http.post($scope.url,$scope.data).success(
        function(response){
        if(response){
            console.log(response);
            $scope.iniciar = function() {
            var $ = go.GraphObject.make;  // para concisión en la definición de plantillas
            myDiagram =
                $(go.Diagram, "modeloRelacional",  //debe nombrar o hacer referencia al elemento DIV HTML
                    {
                        initialContentAlignment: go.Spot.Center,
                        allowDelete: false,
                        allowCopy: false,
                        layout: $(go.ForceDirectedLayout),
                        "undoManager.isEnabled": true
                    });

                // define several shared Brushes //definir varios cepillos compartidos
            var bluegrad = $(go.Brush, "Linear", { 0: "rgb(150, 150, 250)", 0.5: "rgb(86, 86, 186)", 1: "rgb(86, 86, 186)" });
            var greengrad = $(go.Brush, "Linear", { 0: "rgb(158, 209, 159)", 1: "rgb(67, 101, 56)" });
            var redgrad = $(go.Brush, "Linear", { 0: "rgb(206, 106, 100)", 1: "rgb(180, 56, 50)" });
            var yellowgrad = $(go.Brush, "Linear", { 0: "rgb(254, 221, 50)", 1: "rgb(254, 182, 50)" });
            var lightgrad = $(go.Brush, "Linear", { 1: "#E6E6FA", 0: "#FFFAF0" });

            // the template for each attribute in a node's array of item data
            //la plantilla para cada atributo en la matriz de nodo de datos de datos elementos
            var itemTempl =
              $(go.Panel, "Horizontal",
                $(go.Shape,
                  { desiredSize: new go.Size(10, 10) },
                  new go.Binding("figure", "figure"),
                  new go.Binding("fill", "color")),
                $(go.TextBlock,
                  { stroke: "#333333",
                    font: "bold 14px sans-serif" },
                  new go.Binding("text", "name"))
              );

            // define the Node template, representing an entity
            // definir la plantilla de nodo, que representa a una entidad
            myDiagram.nodeTemplate =
              $(go.Node, "Auto",  // the whole node panel //el panel entero de nodo
                { selectionAdorned: true,
                  resizable: true,
                  layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
                  fromSpot: go.Spot.AllSides,
                  toSpot: go.Spot.AllSides,
                  isShadowed: true,
                  shadowColor: "#C5C1AA" },
                new go.Binding("location", "location").makeTwoWay(),
                // define the node's outer shape, which will surround the Table
                //definir la forma exterior del nodo, que rodeará la mesa
                $(go.Shape, "Rectangle",
                  { fill: lightgrad, stroke: "#756875", strokeWidth: 3 }),
                $(go.Panel, "Table",
                  { margin: 8, stretch: go.GraphObject.Fill },
                  $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
                  // el encabezado de tabla
                  $(go.TextBlock,
                    {
                      row: 0, alignment: go.Spot.Center,
                      margin: new go.Margin(0, 14, 0, 2),  // dejar espacio para botón
                      font: "bold 16px sans-serif"
                    },
                    new go.Binding("text", "key")),
                  // el botón contraer/expandir
                  $("PanelExpanderButton", "LIST",  // el nombre del elemento cuya visibilidad este botón alterna
                    { row: 0, alignment: go.Spot.TopRight }),                
                  // la lista de paneles, cada uno mostrando un atributo
                  $(go.Panel, "Vertical",
                    {
                        name: "LIST",
                        row: 1,
                        padding: 3,
                        alignment: go.Spot.TopLeft,
                        defaultAlignment: go.Spot.Left,
                        stretch: go.GraphObject.Horizontal,
                        itemTemplate: itemTempl
                    },
                    new go.Binding("itemArray", "items"))
                ),
            $("Button",
              { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left,
                click: addNodeAndLink },  // define click behavior for Button in Adornment
              $(go.TextBlock, "inf",  // the Button content
                { font: "bold 6pt sans-serif" })
            )
              );  // end Node

            // define the Link template, representing a relationship
            myDiagram.linkTemplate = $(go.Link,  // the whole link panel
                {
                  selectionAdorned: true,
                  layerName: "Foreground",
                  reshapable: true,
                  routing: go.Link.AvoidsNodes,
                  corner: 5,
                  curve: go.Link.JumpOver
                },
                $(go.Shape,  // the link shape
                  { stroke: "#303B45", strokeWidth: 2.5 }),
                $(go.TextBlock,  // the "from" label
                  {
                    textAlign: "center",
                    font: "bold 14px sans-serif",
                    stroke: "#1967B3",
                    segmentIndex: 0,
                    segmentOffset: new go.Point(NaN, NaN),
                    segmentOrientation: go.Link.OrientUpright
                  },
                  new go.Binding("text", "text")),
                $(go.TextBlock,  // the "to" label
                  {
                    textAlign: "center",
                    font: "bold 14px sans-serif",
                    stroke: "#1967B3",
                    segmentIndex: -1,
                    segmentOffset: new go.Point(NaN, NaN),
                    segmentOrientation: go.Link.OrientUpright
                  },
                  new go.Binding("text", "toText"))
              );

            // Creacion del modelo E-R..
            var nodeDataArray = [
              { key: "Productos",
                items: [ { name: "ProductID", iskey: true, figure: "Decision", color: yellowgrad },
                         { name: "ProductName", iskey: false, figure: "Cube1", color: bluegrad },
                         { name: "SupplierID", iskey: false, figure: "Decision", color: "purple" },
                         { name: "CategoryID", iskey: false, figure: "Decision", color: "purple" }
                        ]},
              { key: "Suppliers",
                items: [ { name: "SupplierID", iskey: true, figure: "Decision", color: yellowgrad},
                         { name: "CompanyName", iskey: false, figure: "Cube1", color: bluegrad },
                         { name: "ContactName", iskey: false, figure: "Cube1", color: bluegrad },
                         { name: "Address", iskey: false, figure: "Cube1", color: bluegrad } ] },
              { key: "Categorias",
                items: [ { name: "CategoryID", iskey: true, figure: "Decision", color: yellowgrad },
                         { name: "CategoryName", iskey: false, figure: "Cube1", color: bluegrad },
                         { name: "Description", iskey: false, figure: "Cube1", color: bluegrad },
                         { name: "Picture", iskey: false, figure: "TriangleUp", color: redgrad } ] },
              { key: "Order Details",
                items: [ { name: "OrderID", iskey: true, figure: "Decision", color: yellowgrad },
                         { name: "ProductID", iskey: true, figure: "Decision", color: yellowgrad },
                         { name: "UnitPrice", iskey: false, figure: "MagneticData", color: greengrad },
                         { name: "Quantity", iskey: false, figure: "MagneticData", color: greengrad },
                         { name: "Discount", iskey: false, figure: "MagneticData", color: greengrad } ] }
            ];
            var linkDataArray = [
                { from: "Productos", to: "Suppliers", text: "0..N", toText: "1" },
                { from: "Productos", to: "Categorias", text: "0..N", toText: "1" },
                { from: "Order Details", to: "Productos", text: "0..N", toText: "1" }
                ];
            myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
            };
            $scope.iniciar();
            function addNodeAndLink(e, b) {
                console.log("Entre");
              /*
                // take a button panel in an Adornment, get its Adornment, and then get its adorned Node
              var node = b.part.adornedPart;
              // we are modifying the model, so conduct a transaction
              var diagram = node.diagram;
              diagram.startTransaction("add node and link");
              // have the Model add the node data
              var newnode = { key: "N" };
              diagram.model.addNodeData(newnode);
              // locate the node initially where the parent node is
              diagram.findNodeForData(newnode).location = node.location;
              // and then add a link data connecting the original node with the new one
              var newlink = { from: node.data.key, to: newnode.key };
              diagram.model.addLinkData(newlink);
              // finish the transaction -- will automatically perform a layout
              diagram.commitTransaction("add node and link");*/
            }
        }
        else{
            alert(response);
        }
    });
    };
    $scope.get_table_and_column();
    /*
    $scope.iniciar = function() {
        console.log(responseQuery);
    var $ = go.GraphObject.make;  // for conciseness in defining templates
    myDiagram =
      $(go.Diagram, "myDiagramDiv",  // must name or refer to the DIV HTML element
        {
          initialContentAlignment: go.Spot.Center,
          allowDelete: false,
          allowCopy: false,
          layout: $(go.ForceDirectedLayout),
          "undoManager.isEnabled": true
        });

    // define several shared Brushes
    var bluegrad = $(go.Brush, "Linear", { 0: "rgb(150, 150, 250)", 0.5: "rgb(86, 86, 186)", 1: "rgb(86, 86, 186)" });
    var greengrad = $(go.Brush, "Linear", { 0: "rgb(158, 209, 159)", 1: "rgb(67, 101, 56)" });
    var redgrad = $(go.Brush, "Linear", { 0: "rgb(206, 106, 100)", 1: "rgb(180, 56, 50)" });
    var yellowgrad = $(go.Brush, "Linear", { 0: "rgb(254, 221, 50)", 1: "rgb(254, 182, 50)" });
    var lightgrad = $(go.Brush, "Linear", { 1: "#E6E6FA", 0: "#FFFAF0" });

    // the template for each attribute in a node's array of item data
    var itemTempl =
      $(go.Panel, "Horizontal",
        $(go.Shape,
          { desiredSize: new go.Size(10, 10) },
          new go.Binding("figure", "figure"),
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { stroke: "#333333",
            font: "bold 14px sans-serif" },
          new go.Binding("text", "name"))
      );

    // define the Node template, representing an entity
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",  // the whole node panel
        { selectionAdorned: true,
          resizable: true,
          layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides,
          isShadowed: true,
          shadowColor: "#C5C1AA" },
        new go.Binding("location", "location").makeTwoWay(),
        // define the node's outer shape, which will surround the Table
        $(go.Shape, "Rectangle",
          { fill: lightgrad, stroke: "#756875", strokeWidth: 3 }),
        $(go.Panel, "Table",
          { margin: 8, stretch: go.GraphObject.Fill },
          $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
          // the table header
          $(go.TextBlock,
            {
              row: 0, alignment: go.Spot.Center,
              margin: new go.Margin(0, 14, 0, 2),  // leave room for Button
              font: "bold 16px sans-serif"
            },
            new go.Binding("text", "key")),
          // the collapse/expand button
          $("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
            { row: 0, alignment: go.Spot.TopRight }),
          // the list of Panels, each showing an attribute
          $(go.Panel, "Vertical",
            {
              name: "LIST",
              row: 1,
              padding: 3,
              alignment: go.Spot.TopLeft,
              defaultAlignment: go.Spot.Left,
              stretch: go.GraphObject.Horizontal,
              itemTemplate: itemTempl
            },
            new go.Binding("itemArray", "items"))
        )  // end Table Panel
      );  // end Node

    // define the Link template, representing a relationship
    myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel
        {
          selectionAdorned: true,
          layerName: "Foreground",
          reshapable: true,
          routing: go.Link.AvoidsNodes,
          corner: 5,
          curve: go.Link.JumpOver
        },
        $(go.Shape,  // the link shape
          { stroke: "#303B45", strokeWidth: 2.5 }),
        $(go.TextBlock,  // the "from" label
          {
            textAlign: "center",
            font: "bold 14px sans-serif",
            stroke: "#1967B3",
            segmentIndex: 0,
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding("text", "text")),
        $(go.TextBlock,  // the "to" label
          {
            textAlign: "center",
            font: "bold 14px sans-serif",
            stroke: "#1967B3",
            segmentIndex: -1,
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding("text", "toText"))
      );

    // create the model for the E-R diagram
    var nodeDataArray = [
      { key: "Productos",
        items: [ { name: "ProductID", iskey: true, figure: "Decision", color: yellowgrad },
                 { name: "ProductName", iskey: false, figure: "Cube1", color: bluegrad },
                 { name: "SupplierID", iskey: false, figure: "Decision", color: "purple" },
                 { name: "CategoryID", iskey: false, figure: "Decision", color: "purple" } ] },
      { key: "Suppliers",
        items: [ { name: "SupplierID", iskey: true, figure: "Decision", color: yellowgrad },
                 { name: "CompanyName", iskey: false, figure: "Cube1", color: bluegrad },
                 { name: "ContactName", iskey: false, figure: "Cube1", color: bluegrad },
                 { name: "Address", iskey: false, figure: "Cube1", color: bluegrad } ] },
      { key: "Categorias",
        items: [ { name: "CategoryID", iskey: true, figure: "Decision", color: yellowgrad },
                 { name: "CategoryName", iskey: false, figure: "Cube1", color: bluegrad },
                 { name: "Description", iskey: false, figure: "Cube1", color: bluegrad },
                 { name: "Picture", iskey: false, figure: "TriangleUp", color: redgrad } ] },
      { key: "Order Details",
        items: [ { name: "OrderID", iskey: true, figure: "Decision", color: yellowgrad },
                 { name: "ProductID", iskey: true, figure: "Decision", color: yellowgrad },
                 { name: "UnitPrice", iskey: false, figure: "MagneticData", color: greengrad },
                 { name: "Quantity", iskey: false, figure: "MagneticData", color: greengrad },
                 { name: "Discount", iskey: false, figure: "MagneticData", color: greengrad } ] },
    ];
    var linkDataArray = [
      { from: "Productos", to: "Suppliers", text: "0..N", toText: "1" },
      { from: "Productos", to: "Categorias", text: "0..N", toText: "1" },
      { from: "Order Details", to: "Productos", text: "0..N", toText: "1" }
    ];
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
  };*/
  //$scope.iniciar();
});