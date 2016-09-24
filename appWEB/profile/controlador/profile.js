/* global go, NaN */
angular.module('AdminSqlServer')
.controller("profileCtrl", function($scope,$http,$location,serveData)
{
    $scope.get_table_and_column = function(){
        $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=GetTable_and_Column";
        console.log(serveData);
        $scope.data = {dbName: serveData.dbName,userName: serveData.userName, password: serveData.password}; 
        
        $http.post($scope.url,$scope.data).success(
        function(response){
        if(response){
            $scope.array = [];
            $scope.array = response;
            //console.log(response);
            $scope.iniciar = function(response) {
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

            // Creacion del modelo E-R.. punto restauracion.
            var nodeDataArray2 = [];
            var NombreGlobal = "Inicio";
            for (var i = 0; i < response.length; i++) {
                var nombreTabla = response[i].Tabla;
                console.log(nombreTabla);
                if(NombreGlobal != nombreTabla){
                    var json = {key: nombreTabla, items: []};
                    for (var j = 0; j < response.length; j++) {
                        if (nombreTabla == response[j].Tabla){
                            var ite = {name: response[j].Columna, iskey: true, figure: "Decision", color: yellowgrad };
                            json.items.push(ite);
                        }
                    };
                    NombreGlobal = nombreTabla;
                    nodeDataArray2.push(json);    
                }
            };
            console.log("Con for anidado");
            console.log(nodeDataArray2);
            var linkDataArray = [
                { from: "Productos", to: "Suppliers", text: "0..N", toText: "1" },
                { from: "Productos", to: "Categorias", text: "0..N", toText: "1" },
                { from: "Order Details", to: "Productos", text: "0..N", toText: "1" }
                ];
            console.log("Antes de entar");
            console.log(nodeDataArray2);
            myDiagram.model = new go.GraphLinksModel(nodeDataArray2, linkDataArray);
            };
            $scope.iniciar(response);
        }
        else{
            alert("Viene limpio");
        }
    });
    };
    $scope.get_table_and_column();   
});
/*
 * Ejemplo de JSON a armar
 *             var nodeDataArray = [
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
 */