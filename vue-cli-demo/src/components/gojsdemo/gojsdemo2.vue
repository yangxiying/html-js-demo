<template>
  <div>
    <div>
      <el-button @click="init1">一</el-button>
      <el-button @click="init2">二</el-button>
      <el-button @click="init3">3</el-button>
      <el-button @click="init4">4</el-button>
      <el-button @click="init4_2">取得画布的数据</el-button>
      <!-- <img src="static/svg/map.svg"> -->
    </div>
    <!-- <div class="lean" ref="demo1111" v-show="show">wwww</div> -->
    <!-- <div style="width: 100%; display: flex; justify-content: space-between">
      <div ref="myPaletteDiv" style="width: 100px; margin-right: 2px; background-color: #282c34;"></div>
      <div ref="myDiagramDiv" style="flex-grow: 1; height: 750px; background-color: #282c34;"></div>
    </div>-->
    <div>
      <!-- commandHandler -->
      <el-button @click="init4_fit1(0)">还原</el-button>
      <el-button @click="init4_fit1(1)">++</el-button>
      <el-button @click="init4_fit1(-1)">--</el-button>
    </div>
    <div style="width: 100%; display: flex; justify-content: space-between">
      <div
        ref="myPaletteDiv"
        style="width: 105px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black"
      ></div>
      <div ref="myDiagramDiv" style="flex-grow: 1; height: 620px; border: solid 0px black"></div>
    </div>
  </div>
</template>

<script>
import go from "gojs";
let GO = go.GraphObject.make;
export default {
  data() {
    return {
      diagram: null,
      diagram2: null,
      show: true,
      imgsrc: "static/svg/map.svg",
    };
  },
  methods: {
    load1() {
      if (this.diagram) this.diagram.div = null;
      if (this.diagram2) this.diagram2.div = null;
      this.diagram = GO(go.Diagram, this.$refs.myDiagramDiv, {
        //模型图的中心位置所在坐标
        initialContentAlignment: go.Spot.Center,
        //允许用户操作图表的时候使用Ctrl-Z撤销和Ctrl-Y重做快捷键
        "undoManager.isEnabled": true,
        //允许在画布上面双击的时候创建节点
        "clickCreatingTool.archetypeNodeData": {
          category: "yxy2",
          fill: "#00AD5F",
          text: "Node",
          figure: "RoundedRectangle",
        },
        isReadOnly: false, // allow selection but not moving or copying or deleting
        scaleComputation: function (d, newsc) {
          // only allow scales that are a multiple of 0.1
          var oldsc = Math.round(d.scale * 10);
          var sc = oldsc + (newsc * 10 > oldsc ? 1 : -1);
          if (sc < 1) sc = 1; // but disallow zero or negative!
          return sc / 10;
        },
        "toolManager.hoverDelay": 100, // how quickly tooltips are shown
      });
    },
    init1() {
      this.load1();

      // the background image, a floor plan
      this.diagram.add(
        GO(
          go.Part, // this Part is not bound to any model data
          {
            width: 840,
            height: 570,
            layerName: "Background",
            position: new go.Point(0, 0),
            selectable: false,
            pickable: false,
          },
          GO(go.Picture, { source: "static/123.png" })
        )
      );

      this.diagram.nodeTemplate = GO(
        go.Node,
        "Auto",
        GO(go.Shape, "RoundedRectangle", new go.Binding("fill", "color")),
        GO(go.TextBlock, { margin: 3 }, new go.Binding("text", "key"))
      );
      this.diagram.model = new go.GraphLinksModel(
        [
          { key: "Alpha", color: "lightblue" },
          { key: "Beta", color: "orange" },
          { key: "Gamma", color: "lightgreen" },
          { key: "Delta", color: "pink" },
        ],
        [
          // a JavaScript Array of JavaScript objects, one per link
          { from: "Alpha", to: "Beta" },
          { from: "Alpha", to: "Gamma" },
          { from: "Beta", to: "Beta" },
          { from: "Gamma", to: "Delta" },
          { from: "Delta", to: "Alpha" },
        ]
      );
    },
    load2() {
      if (this.diagram) this.diagram.div = null;
      if (this.diagram2) this.diagram2.div = null;
      this.diagram = GO(
        go.Diagram,
        this.$refs.demo1111, // must name or refer to the DIV HTML element
        {
          //   LinkDrawn: showLinkLabel, // this DiagramEvent listener is defined below
          //   LinkRelinked: showLinkLabel,
          "undoManager.isEnabled": true, // enable undo & redo
        }
      );
    },
    nodeStyle() {
      return [
        // The Node.location comes from the "loc" property of the node data,
        // converted by the Point.parse static method.
        // If the Node.location is changed, it updates the "loc" property of the node data,
        // converting back using the Point.stringify static method.
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        {
          // the Node.location is at the center of each node
          locationSpot: go.Spot.Center,
        },
      ];
    },
    textStyle() {
      return {
        font: "bold 11pt Lato, Helvetica, Arial, sans-serif",
        stroke: "#F8F8F8",
      };
    },
    makePort(name, align, spot, output, input) {
      var horizontal =
        align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
      // the port is basically just a transparent rectangle that stretches along the side of the node,
      // and becomes colored when the mouse passes over it
      return GO(go.Shape, {
        fill: "transparent", // changed to a color in the mouseEnter event handler
        strokeWidth: 0, // no stroke
        width: horizontal ? NaN : 8, // if not stretching horizontally, just 8 wide
        height: !horizontal ? NaN : 8, // if not stretching vertically, just 8 tall
        alignment: align, // align the port on the main Shape
        stretch: horizontal
          ? go.GraphObject.Horizontal
          : go.GraphObject.Vertical,
        portId: name, // declare this object to be a "port"
        fromSpot: spot, // declare where links may connect at this port
        fromLinkable: output, // declare whether the user may draw links from here
        toSpot: spot, // declare where links may connect at this port
        toLinkable: input, // declare whether the user may draw links to here
        cursor: "pointer", // show a different cursor to indicate potential link point
        mouseEnter: function (e, port) {
          // the PORT argument will be this Shape
          if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
        },
        mouseLeave: function (e, port) {
          port.fill = "transparent";
        },
      });
    },
    init2() {
      this.load2();
      // define the Node templates for regular nodes

      this.diagram = GO(
        go.Diagram,
        this.$refs.myDiagramDiv, // must name or refer to the DIV HTML element
        {
          // "LinkDrawn": showLinkLabel,  // this DiagramEvent listener is defined below
          // "LinkRelinked": showLinkLabel,
          //允许在画布上面双击的时候创建节点
          "clickCreatingTool.archetypeNodeData": {
            category: "yxy2",
            fill: "#00AD5F",
            text: "Node",
            figure: "RoundedRectangle",
          },
          "undoManager.isEnabled": true, // enable undo & redo
        }
      );

      //   this.diagram.nodeTemplateMap.add(
      //     "", // the default category
      //     GO(
      //       go.Node,
      //       "Table",
      //       this.nodeStyle(),
      //       // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
      //       GO(
      //         go.Panel,
      //         "Auto",
      //         GO(
      //           go.Shape,
      //           "Rectangle",
      //           { fill: "#282c34", stroke: "#00A9C9", strokeWidth: 3.5 },
      //           new go.Binding("figure", "figure")
      //         ),
      //         GO(
      //           go.TextBlock,
      //           this.textStyle(),
      //           {
      //             margin: 8,
      //             maxSize: new go.Size(160, NaN),
      //             wrap: go.TextBlock.WrapFit,
      //             editable: true
      //           },
      //           new go.Binding("text").makeTwoWay()
      //         )
      //       )
      //       // four named ports, one on each side:
      //       //   this.makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
      //       //   this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
      //       //   this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
      //       //   this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
      //     )
      //   );

      //   this.diagram.nodeTemplateMap.add(
      //     "Conditional",
      //     GO(
      //       go.Node,
      //       "Table",
      //       this.nodeStyle(),
      //       // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
      //       GO(
      //         go.Panel,
      //         "Auto",
      //         GO(
      //           go.Shape,
      //           "Diamond",
      //           { fill: "#282c34", stroke: "#00A9C9", strokeWidth: 3.5 },
      //           new go.Binding("figure", "figure")
      //         ),
      //         GO(
      //           go.TextBlock,
      //           this.textStyle(),
      //           {
      //             margin: 8,
      //             maxSize: new go.Size(160, NaN),
      //             wrap: go.TextBlock.WrapFit,
      //             editable: true
      //           },
      //           new go.Binding("text").makeTwoWay()
      //         )
      //       ),
      //       // four named ports, one on each side:
      //     //   this.makePort("T", go.Spot.Top, go.Spot.Top, false, true),
      //     //   this.makePort("L", go.Spot.Left, go.Spot.Left, true, true),
      //     //   this.makePort("R", go.Spot.Right, go.Spot.Right, true, true),
      //     //   this.makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
      //     )
      //   );

      // 定义个简单的 Node 模板
      //   this.diagram.nodeTemplateMap.add(
      //     "yxy1",
      //     GO(
      //       go.Node,
      //       "Horizontal",
      //       // 为整个Node背景设置为浅蓝色
      //       { background: "#44CCFF" ,resizable: true, resizeCellSize: new go.Size(20, 20)},
      //       GO(
      //         go.Picture,
      //         // Pictures 应该指定宽高.
      //         // 当没有图片时显示红色的背景
      //         // 或者当图片为透明的时候也是.
      //         { margin: 10, width: 50, height: 50, background: "red" },
      //         // Picture.source参数值与模型数据中的"source"字段绑定
      //         new go.Binding("source")
      //       ),
      //       GO(
      //         go.TextBlock,
      //         "Default Text", // 初始化默认文本
      //         // 文字周围的空隙, 大号字体, 白色笔画:
      //         { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
      //         // TextBlock.text参数值与模型数据中的"name"字段绑定
      //         new go.Binding("text", "name")
      //       )
      //     )
      //   );

      let nodeSelectionAdornmentTemplate = GO(
        go.Adornment,
        "Auto",
        GO(go.Shape, {
          fill: null,
          stroke: "deepskyblue",
          strokeWidth: 1.5,
          strokeDashArray: [4, 2],
        }),
        GO(go.Placeholder)
      );
      let nodeResizeAdornmentTemplate = GO(
        go.Adornment,
        "Spot",
        { locationSpot: go.Spot.Right },
        GO(go.Placeholder),
        GO(go.Shape, {
          alignment: go.Spot.TopLeft,
          cursor: "nw-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          alignment: go.Spot.Top,
          cursor: "n-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          alignment: go.Spot.TopRight,
          cursor: "ne-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),

        GO(go.Shape, {
          alignment: go.Spot.Left,
          cursor: "w-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          alignment: go.Spot.Right,
          cursor: "e-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),

        GO(go.Shape, {
          alignment: go.Spot.BottomLeft,
          cursor: "se-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          alignment: go.Spot.Bottom,
          cursor: "s-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          alignment: go.Spot.BottomRight,
          cursor: "sw-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        })
      );

      let nodeRotateAdornmentTemplate = GO(
        go.Adornment,
        { locationSpot: go.Spot.Center, locationObjectName: "CIRCLE" },
        GO(go.Shape, "Circle", {
          name: "CIRCLE",
          cursor: "pointer",
          desiredSize: new go.Size(7, 7),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          geometryString: "M3.5 7 L3.5 30",
          isGeometryPositioned: true,
          stroke: "deepskyblue",
          strokeWidth: 1.5,
          strokeDashArray: [4, 2],
        })
      );

      this.diagram.nodeTemplateMap.add(
        "yxy2",
        GO(
          go.Node,
          "Spot",
          { locationSpot: go.Spot.Center },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          {
            selectable: true,
            selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
          },
          {
            resizable: true,
            resizeObjectName: "PANEL",
            resizeAdornmentTemplate: nodeResizeAdornmentTemplate,
          },
          {
            rotatable: true,
            rotateAdornmentTemplate: nodeRotateAdornmentTemplate,
          },
          new go.Binding("angle").makeTwoWay(),
          // the main object is a Panel that surrounds a TextBlock with a Shape
          GO(
            go.Panel,
            "Auto",
            { name: "PANEL" },
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
              go.Size.stringify
            ),
            GO(
              go.Shape,
              "Rectangle", // default figure
              {
                portId: "", // the default port: if no spot on link data, use closest side
                fromLinkable: true,
                toLinkable: true,
                cursor: "pointer",
                fill: "white", // default color
                strokeWidth: 2,
              },
              new go.Binding("figure"),
              new go.Binding("fill")
            ),
            GO(
              go.TextBlock,
              {
                font: "bold 11pt Helvetica, Arial, sans-serif",
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true,
              },
              new go.Binding("text").makeTwoWay()
            )
          ),
          // four small named ports, one on each side:
          //   makePort("T", go.Spot.Top, false, true),
          //   makePort("L", go.Spot.Left, true, true),
          //   makePort("R", go.Spot.Right, true, true),
          //   makePort("B", go.Spot.Bottom, true, false),
          {
            // handle mouse enter/leave events to show/hide the ports
            mouseEnter: function (e, node) {
              console.info("sssssss");
              showSmallPorts(node, true);
            },
            mouseLeave: function (e, node) {
              showSmallPorts(node, false);
            },
          }
        )
      );
      function showSmallPorts(node, show) {
        node.ports.each(function (port) {
          if (port.portId !== "") {
            // don't change the default port, which is the big shape
            port.fill = show ? "rgba(0,0,0,.3)" : null;
          }
        });
      }

      this.diagram2 = GO(
        go.Palette,
        this.$refs.myPaletteDiv, // must name or refer to the DIV HTML element
        {
          maxSelectionCount: 1,
          // Instead of the default animation, use a custom fade-down
          //   "animationManager.initialAnimationStyle": go.AnimationManager.None,
          // "InitialAnimationStarting": animateFadeDown, // Instead, animate with this function

          nodeTemplateMap: this.diagram.nodeTemplateMap, // share the templates used by myDiagram
          model: new go.GraphLinksModel([
            // specify the contents of the Palette
            // { text: "地" },
            // { text: " - - - - - " },
            // { category: "yxy1", text: "yxy1" },
            {
              category: "yxy2",
              text: "Start",
              figure: "Rectangle",
              fill: "#00AD5F",
            },
            // { category: "yxy2", text: "yxy1" }
          ]),
        }
      );
    },
    init3() {
      if (this.diagram) this.diagram.div = null;
      if (this.diagram2) this.diagram2.div = null;
      this.diagram = GO(
        go.Diagram,
        this.$refs.myDiagramDiv, // create the Diagram for the HTML DIV element
        {
          layout: GO(go.GridLayout, { sorting: go.GridLayout.Forward }), // use a GridLayout
          padding: new go.Margin(5, 5, 25, 5), // to see the names of shapes on the bottom row
        }
      );

      function mouseEnter(e, obj) {
        obj.isHighlighted = true;
      }

      function mouseLeave(e, obj) {
        obj.isHighlighted = false;
      }

      // Names of the built in shapes, which we will color green instead of pink.
      // The pinks shapes are instead defined in the "../extensions/figures.js" file.
      //   var builtIn = ["Rectangle", "Square", "RoundedRectangle", "Border", "Ellipse", "Circle", "TriangleRight", "TriangleDown", "TriangleLeft", "TriangleUp", "Triangle", "Diamond", "LineH", "LineV", "None", "BarH", "BarV", "MinusLine", "PlusLine", "XLine"];
      var builtIn = [
        "Rectangle",
        "Circle",
        "TriangleRight",
        "Diamond",
        "LineH",
        "BarV",
      ];
      function isBuiltIn(shapeName) {
        return (
          builtIn.find(function (element) {
            return element.toLowerCase() === shapeName.toLowerCase();
          }) !== undefined
        );
      }

      this.diagram.nodeTemplate = GO(
        go.Node,
        "Vertical",
        {
          mouseEnter: mouseEnter,
          mouseLeave: mouseLeave,
          locationSpot: go.Spot.Center, // the location is the center of the Shape
          locationObjectName: "SHAPE",
          selectionAdorned: false, // no selection handle when selected
          resizable: true,
          resizeObjectName: "SHAPE", // user can resize the Shape
          rotatable: true,
          rotateObjectName: "SHAPE", // rotate the Shape without rotating the label
          // don't re-layout when node changes size
          layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
        },
        new go.Binding("layerName", "isHighlighted", function (h) {
          return h ? "Foreground" : "";
        }).ofObject(),
        GO(
          go.Shape,
          {
            name: "SHAPE", // named so that the above properties can refer to this GraphObject
            width: 70,
            height: 70,
            strokeWidth: 3,
          },
          // Color the built in shapes green, and the figures.js shapes Pink
          new go.Binding("fill", "key", function (k) {
            return isBuiltIn(k) ? "palegreen" : "lightpink";
          }),
          new go.Binding("stroke", "key", function (k) {
            return isBuiltIn(k) ? "darkgreen" : "#C2185B";
          }),
          // bind the Shape.figure to the figure name, which automatically gives the Shape a Geometry
          new go.Binding("figure", "key")
        ),
        GO(
          go.TextBlock, // the label
          {
            margin: 4,
            font: "bold 18px sans-serif",
            background: "white",
          },
          new go.Binding("visible", "isHighlighted").ofObject(),
          new go.Binding("text", "key")
        )
      );

      // initialize the model
      //   this.diagram.model.nodeDataArray = go.Shape.getFigureGenerators().toArray();
      //   this.diagram.model.nodeDataArray = [{ key: "Circle", fill: "palegreen" }];

      this.diagram2 = GO(
        go.Palette,
        this.$refs.myPaletteDiv, // must name or refer to the DIV HTML element
        {
          maxSelectionCount: 1,
          // Instead of the default animation, use a custom fade-down
          //   "animationManager.initialAnimationStyle": go.AnimationManager.None,
          // "InitialAnimationStarting": animateFadeDown, // Instead, animate with this function

          //   nodeTemplateMap: this.diagram.nodeTemplateMap, // share the templates used by myDiagram
          //   model:{
          //       nodeDataArray: [{ key: "Circle", fill: "palegreen" }]
          //   }
        }
      );
      // key: "Rectangle",
      this.diagram2.model.nodeDataArray = [
        { figure: "Circle", fill: "palegreen" },
      ];
    },
    init4() {
      if (this.diagram) this.diagram.div = null;
      this.diagram = GO(
        go.Diagram,
        this.$refs.myDiagramDiv, // must name or refer to the DIV HTML element
        {
          //   "undoManager.isEnabled": true // enable undo & redo
          scale: 1, //初始视图大小比例
          minScale: 1, //最小视图的缩小比例
          maxScale: 20, //最大视图的放大比例
          "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, //鼠标滚轮事件
          nodeSelectionAdornmentTemplate: nodeDSelectionAdornmentTemplate,
        }
      );
      let nodeDSelectionAdornmentTemplate = GO(
        go.Adornment,
        "Auto",
        GO(go.Shape, {
          fill: null,
          stroke: "deepskyblue",
          strokeWidth: 2,
          strokeDashArray: [4, 2],
        }),
        GO(go.Placeholder)
      );

      // let img1 = new Image(); // Image 构造器
      // img1.src = this.imgsrc;

      this.diagram.add(
        GO(
          go.Part, // this Part is not bound to any model data
          {
            // width: 840,
            // height: 570,
            layerName: "Background",
            position: new go.Point(0, 0),
            selectable: false,
            // pickable: false
          },
          GO(go.Picture, {
            // desiredSize: new go.Size(800, 800),source: "static/123.png"
            desiredSize: new go.Size(1120, 640),
            source: "static/svg/map.svg",
            imageStretch: go.GraphObject.UniformToFill,
            margin: 2,
            imageAlignment: go.Spot.Left,
            // width: 580, height: 580
          })
        )
      );

      let nodeSelectionAdornmentTemplate = GO(
        go.Adornment,
        "Auto",
        GO(go.Shape, {
          fill: null,
          stroke: "deepskyblue",
          strokeWidth: 1,
          strokeDashArray: [4, 2],
        }),
        GO(go.Placeholder)
      );
      let nodeResizeAdornmentTemplate = GO(
        go.Adornment,
        "Spot",
        { locationSpot: go.Spot.Right },
        GO(go.Placeholder),
        GO(go.Shape, {
          alignment: go.Spot.TopLeft,
          cursor: "nw-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          alignment: go.Spot.Top,
          cursor: "n-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          alignment: go.Spot.TopRight,
          cursor: "ne-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),

        GO(go.Shape, {
          alignment: go.Spot.Left,
          cursor: "w-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          alignment: go.Spot.Right,
          cursor: "e-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),

        GO(go.Shape, {
          alignment: go.Spot.BottomLeft,
          cursor: "se-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          alignment: go.Spot.Bottom,
          cursor: "s-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          alignment: go.Spot.BottomRight,
          cursor: "sw-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue",
        })
      );

      let nodeRotateAdornmentTemplate = GO(
        go.Adornment,
        { locationSpot: go.Spot.Center, locationObjectName: "CIRCLE" },
        GO(go.Shape, "Circle", {
          name: "CIRCLE",
          cursor: "pointer",
          desiredSize: new go.Size(7, 7),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        GO(go.Shape, {
          geometryString: "M3.5 7 L3.5 30",
          isGeometryPositioned: true,
          stroke: "deepskyblue",
          strokeWidth: 1.5,
          strokeDashArray: [4, 2],
        })
      );

      let nodeMenu = GO(
        // context menu for each Node
        "ContextMenu",
        GO("ContextMenuButton", GO(go.TextBlock, "menu-1"), {
          click: function (e, obj) {
            alert("menu-1");
          },
        }),
        GO("ContextMenuButton", GO(go.TextBlock, "menu-2"), {
          click: function (e, obj) {
            alert("menu-2");
          },
        }),
        GO("ContextMenuButton", GO(go.TextBlock, "menu-3"), {
          click: function (e, obj) {
            alert("menu-3");
          },
        }),
        GO("ContextMenuButton", GO(go.TextBlock, "menu-4"), {
          click: function (e, obj) {
            alert("menu-4");
          },
        })
      );

      let nodeContextMenu = GO(
        go.Adornment,
        "Spot",
        { background: "transparent" }, // to help detect when the mouse leaves the area
        GO(go.Placeholder),
        GO(
          go.Panel,
          "Vertical",
          { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
          GO("Button", GO(go.TextBlock, "Command 1"), {
            click: function (e, obj) {
              var node = obj.part.adornedPart;
              alert("Command 1 on " + node.data.text);
              node.removeAdornment("ContextMenuOver");
            },
          }),
          GO("Button", GO(go.TextBlock, "Command 2"), {
            click: function (e, obj) {
              var node = obj.part.adornedPart;
              alert("Command 2 on " + node.data.text);
              node.removeAdornment("ContextMenuOver");
            },
          })
        )
      );

      function textStyle(field) {
        return [
          {
            font: "12px Roboto, sans-serif",
            stroke: "rgba(0, 0, 0, .60)",
            overflow: true,
            visible: false, // only show textblocks when there is corresponding data for them
          },
          new go.Binding("visible", field, function (val) {
            return val !== undefined;
          }),
        ];
      }

      this.diagram.nodeTemplateMap.add(
        "11", // the default category
        GO(
          go.Node,
          "Spot",
          {
            contextMenu: nodeMenu,
            // here the second argument is this object, which is this Node
            // doubleClick: function(e, node) {
            //   alert("doubleClick==node.data.key:::::::::::" + node.data.key);
            // },
            // click: function(e, node) {
            //   alert("click===node.data:::::" + node.data);
            // }
          },
          //相对位置
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          //形状大小
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
            go.Size.stringify
          ),
          {
            selectable: true, //是否可选择,默认true
            //选中时改变样式
            selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
          },
          {
            resizable: true, //是否可改变大小，默认false
            resizeObjectName: "PANEL",
            // resizeAdornmentTemplate: nodeResizeAdornmentTemplate
          },
          {
            rotatable: true, //是否可旋转，默认false
            rotateAdornmentTemplate: nodeRotateAdornmentTemplate,
          },
          new go.Binding("angle").makeTwoWay(), //偏移角度,旋转的角度
          { stretch: go.GraphObject.Fill },
          GO(
            go.Panel,
            "Auto",
            // { name: "PANEL", contextMenu: nodeMenu },
            // new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
            //   go.Size.stringify
            // ),
            { stretch: go.GraphObject.Fill },
            // GO(
            //   go.Shape,
            //   "Rectangle",
            //   {
            //     portId: "", // the default port: if no spot on link data, use closest side
            //     cursor: "pointer",
            //     fill: null, // default color
            //     strokeWidth: 1,
            //   },
            //   new go.Binding("figure"),
            //   new go.Binding("fill"),
            //   // GO(
            //   //   go.Panel,
            //   //   "Horizontal",

            //   //   GO(go.Picture, {
            //   //     // desiredSize: new go.Size(800, 800),source: "static/123.png"
            //   //     // desiredSize: new go.Size(100, 90),
            //   //     source: "static/img/0022222.png",
            //   //     imageStretch: go.GraphObject.Uniform, // GraphObject.Fill, GraphObject.Uniform, GraphObject.UniformToFill, and GraphObject.None. The default is GraphObject.Fill.
            //   //     // flip: go.GraphObject.FlipBoth,
            //   //     // width: 580, height: 580
            //   //   })
            //   // )
            // ),
            GO(
              go.Picture,
              {
                // desiredSize: new go.Size(800, 800),source: "static/123.png"
                // desiredSize: new go.Size(100, 90),
                source: "static/img/0022222.png",
                imageStretch: go.GraphObject.Fill, // GraphObject.Fill, GraphObject.Uniform, GraphObject.UniformToFill, and GraphObject.None. The default is GraphObject.Fill.
                // flip: go.GraphObject.FlipBoth,
                // width: 580, height: 580
              },
              new go.Binding("source", "pickey")
            ),

            GO(
              go.Panel,
              "Table",
              { stretch: go.GraphObject.Fill }, //raphObject.None, GraphObject.Fill, GraphObject.Horizontal, or GraphObject.Vertical. The default value is GraphObject.Default,
              GO(
                go.TextBlock,
                {
                  row: 0,
                  alignment: go.Spot.TopCenter,
                  font: "16px Roboto, sans-serif",
                  stroke: "rgba(0, 0, 0, .87)",
                  // maxSize: new go.Size(160, NaN),
                  editable: true,
                  textAlign: "center",
                  wrap: go.TextBlock.WrapFit,
                  // maxLines:1,
                  // maxSize:new go.Size(60, 40),
                  // minSize:new go.Size(20, 20),
                  stretch: go.GraphObject.Fill,
                },
                new go.Binding("text", "name")
              ),
              GO(
                go.TextBlock,
                textStyle("title"),
                {
                  row: 1,
                  alignment: go.Spot.Left,
                  // maxSize: new go.Size(60, NaN),
                  editable: true,
                  overflow: go.TextBlock.OverflowEllipsis, // TextBlock.OverflowClip and TextBlock.OverflowEllipsis.
                  textAlign: go.Spot.Top, //水平对齐方式
                  // maxLines:2,//设置文本显示的最大行数
                  // maxSize:new go.Size(60, 40),
                  // minSize:new go.Size(20, 20),
                  wrap: go.TextBlock.None, //如果文本太长而不能放在一行中，是否应对其进行换行。TextBlock.WrapDesiredSize, TextBlock.WrapFit, TextBlock.WrapBreakAll, and TextBlock.None
                  verticalAlignment: go.Spot.Top, //垂直对齐方式
                  // isMultiline: false,  //忽略换行
                  // flip:go.GraphObject.FlipBoth,//字体翻转，GraphObject.None, GraphObject.FlipHorizontal, GraphObject.FlipVertical, or GraphObject.FlipBoth. The default is GraphObject.None.
                  stretch: go.GraphObject.Fill,
                },
                new go.Binding("text", "title")
              )
              // GO("PanelExpanderButton", "INFO",
              //   { row: 0, column: 1, rowSpan: 2, margin: ml8 }
              // )
            ),
            // GO(
            //   go.TextBlock,
            //   // this.textStyle(),
            //   {
            //     font: "bold 11pt Helvetica, Arial, sans-serif",
            //     margin: 8,
            //     maxSize: new go.Size(160, NaN),
            //     wrap: go.TextBlock.WrapFit,
            //     editable: true
            //   },
            //   new go.Binding("text").makeTwoWay()
            // ),
            // GO(
            //   go.TextBlock,
            //   // this.textStyle(),
            //   {
            //     font: "bold 11pt Helvetica, Arial, sans-serif",
            //     margin: 8,
            //     maxSize: new go.Size(160, NaN),
            //     wrap: go.TextBlock.WrapFit,
            //     editable: true
            //   },
            //   new go.Binding("text", "content").makeTwoWay()
            // ),
            {
              //   mouseEnter: function(e, node) {
              //     showSmallPorts(node, true);
              //   },
              //   mouseLeave: function(e, node) {
              //     showSmallPorts(node, false);
              //   }
              //   mouseEnter: function(e, obj) {
              //     obj.strokeWidth = 4;
              //     obj.stroke = "dodgerblue";
              //   },
              //   mouseLeave: function(e, obj) {
              //     obj.strokeWidth = 2;
              //     obj.stroke = "gray";
              //   }
              //   mouseEnter: function(e, node) {
              //     nodeContextMenu.adornedObject = node;
              //     nodeContextMenu.mouseLeave = function(ev, cm) {
              //       node.removeAdornment("ContextMenuOver");
              //     };
              //     node.addAdornment("ContextMenuOver", nodeContextMenu);
              //   }
            }
          )
        )
      );

      this.diagram.nodeTemplateMap.add(
        "FreehandDrawing-1",
        GO(
          go.Part,
          { locationSpot: go.Spot.Center, isLayoutPositioned: false },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          {
            selectionAdorned: true,
            selectionObjectName: "SHAPE",
            // custom selection adornment: a blue rectangle
            selectionAdornmentTemplate: GO(
              go.Adornment,
              "Auto",
              GO(go.Shape, { stroke: "dodgerblue", fill: null }),
              GO(go.Placeholder, { margin: -1 })
            ),
          },
          { resizable: true, resizeObjectName: "SHAPE" },
          { rotatable: true, rotateObjectName: "SHAPE" },
          { reshapable: true }, // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
          GO(
            go.Shape,
            {
              name: "SHAPE",
              fill: null,
              strokeWidth: 1.5,
              geometryString: "M11 45 L0 25 L21 0 L50 17 L39  45",
            },
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
              go.Size.stringify
            ),
            new go.Binding("angle").makeTwoWay(),
            new go.Binding("geometryString", "geo").makeTwoWay(),
            new go.Binding("fill"),
            new go.Binding("stroke"),
            new go.Binding("strokeWidth")
          )
        )
      );

      this.diagram.nodeTemplateMap.add(
        "FreehandDrawing-2",
        GO(
          go.Node,
          { reshapable: true }, // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          { stretch: go.GraphObject.Fill },
          {
            selectable: true, //是否可选择,默认true
            //选中时改变样式
            selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
          },

          GO(
            go.Panel,
            "Auto",
            GO(
              go.Shape,
              {
                name: "SHAPE",
                fill: "transparent", //lightgray
                strokeWidth: 0.5,
                geometryString:
                  "F M0 30 L6 11 L22 0 L46 9 L54 26 L50 43 L29 56 L29 56 L29 56 L6 48z",
              },
              new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
                go.Size.stringify
              ),
              new go.Binding("geometryString", "geo").makeTwoWay(),
              new go.Binding("fill"),
              new go.Binding("stroke"),
              new go.Binding("strokeWidth")
            )
          ),

          GO(
            go.Picture,
            {
              // desiredSize: new go.Size(800, 800),source: "static/123.png"
              // desiredSize: new go.Size(100, 90),
              source: "static/img/0022222.png",
              imageStretch: go.GraphObject.Fill, // GraphObject.Fill, GraphObject.Uniform, GraphObject.UniformToFill, and GraphObject.None. The default is GraphObject.Fill.
              // flip: go.GraphObject.FlipBoth,
              // width: 580, height: 580
            },
            new go.Binding("source", "pickey")
          ),
          GO(
            go.Panel,
            "Table",
            GO(
              go.TextBlock,
              {
                row: 0,
                alignment: go.Spot.LeftCenter,
                font: "16px Roboto, sans-serif",
                stroke: "rgba(0, 0, 0, .87)",
                maxSize: new go.Size(160, NaN),
                editable: true,
              },
              new go.Binding("text", "name")
            ),
            GO(
              go.TextBlock,
              textStyle("title"),
              {
                row: 1,
                alignment: go.Spot.Center,
                maxSize: new go.Size(160, NaN),
                editable: true,
              },
              new go.Binding("text", "title")
            )
          )
        )
      );

      function showSmallPorts(node, show) {
        // node.ports.each(function(port) {
        //   if (port.portId !== "") {
        //     // don't change the default port, which is the big shape
        //     port.fill = show ? "rgba(0,0,0,.3)" : null;
        //   }
        // });
      }

      ("use strict");
      /*
       *  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
       */

      /*
       * This is an extension and not part of the main GoJS library.
       * Note that the API for this class may change with any version, even point releases.
       * If you intend to use an extension in production, you should copy the code to your own source directory.
       * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
       * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
       */

      /**
       * @constructor
       * @extends Tool
       * @class
       * This GeometryReshapingTool class allows for a Shape's Geometry to be modified by the user
       * via the dragging of tool handles.
       * This does not handle Links, whose routes should be reshaped by the LinkReshapingTool.
       * The {@link #reshapeObjectName} needs to identify the named {@link Shape} within the
       * selected {@link Part}.
       * If the shape cannot be found or if its {@link Shape#geometry} is not of type {@link Geometry#Path},
       * this will not show any GeometryReshaping {@link Adornment}.
       * At the current time this tool does not support adding or removing {@link PathSegment}s to the Geometry.
       */
      function GeometryReshapingTool() {
        go.Tool.call(this);
        this.name = "GeometryReshaping";

        var h = new go.Shape();
        h.figure = "Diamond";
        h.desiredSize = new go.Size(7, 7);
        h.fill = "lightblue";
        h.stroke = "dodgerblue";
        h.cursor = "move";
        /** @type {GraphObject} */
        this._handleArchetype = h;

        /** @type {string} */
        this._reshapeObjectName = "SHAPE"; //??? can't add Part.reshapeObjectName property
        // there's no Part.reshapeAdornmentTemplate either

        // internal state
        /** @type {GraphObject} */
        this._handle = null;
        /** @type {Shape} */
        this._adornedShape = null;
        /** @type {Geometry} */
        this._originalGeometry = null; // in case the tool is cancelled and the UndoManager is not enabled
      }
      go.Diagram.inherit(GeometryReshapingTool, go.Tool);

      /*
       * A small GraphObject used as a reshape handle for each segment.
       * The default GraphObject is a small blue diamond.
       * @name GeometryReshapingTool#handleArchetype
       * @function.
       * @return {GraphObject}
       */
      Object.defineProperty(
        GeometryReshapingTool.prototype,
        "handleArchetype",
        {
          get: function () {
            return this._handleArchetype;
          },
          set: function (val) {
            this._handleArchetype = value;
          },
        }
      );

      /*
       * The name of the GraphObject to be reshaped.
       * @name GeometryReshapingTool#reshapeObjectName
       * @function.
       * @return {string}
       */
      Object.defineProperty(
        GeometryReshapingTool.prototype,
        "reshapeObjectName",
        {
          get: function () {
            return this._reshapeObjectName;
          },
          set: function (val) {
            this._reshapeObjectName = value;
          },
        }
      );

      /*
       * This read-only property returns the {@link GraphObject} that is the tool handle being dragged by the user.
       * This will be contained by an {@link Adornment} whose category is "GeometryReshaping".
       * Its {@link Adornment#adornedObject} is the same as the {@link #adornedShape}.
       * @name GeometryReshapingTool#handle
       * @function.
       * @return {GraphObject}
       */
      Object.defineProperty(GeometryReshapingTool.prototype, "handle", {
        get: function () {
          return this._handle;
        },
      });

      /*
       * Gets the {@link Shape} that is being reshaped.
       * This must be contained within the selected Part.
       * @name GeometryReshapingTool#adornedShape
       * @function.
       * @return {Shape}
       */
      Object.defineProperty(GeometryReshapingTool.prototype, "adornedShape", {
        get: function () {
          return this._adornedShape;
        },
      });

      /*
       * This read-only property remembers the original value for {@link Shape#geometry},
       * so that it can be restored if this tool is cancelled.
       * @name GeometryReshapingTool#originalGeometry
       * @function.
       * @return {Geometry}
       */
      Object.defineProperty(
        GeometryReshapingTool.prototype,
        "originalGeometry",
        {
          get: function () {
            return this._originalGeometry;
          },
        }
      );

      /**
       * Show an {@link Adornment} with a reshape handle at each point of the geometry.
       * Don't show anything if {@link #reshapeObjectName} doesn't identify a {@link Shape}
       * that has a {@link Shape#geometry} of type {@link Geometry#Path}.
       * @this {GeometryReshapingTool}
       * @param {Part} part the part.
       */
      GeometryReshapingTool.prototype.updateAdornments = function (part) {
        if (part === null || part instanceof go.Link) return; // this tool never applies to Links
        if (part.isSelected && !this.diagram.isReadOnly) {
          var selelt = part.findObject(this.reshapeObjectName);
          if (
            selelt instanceof go.Shape &&
            selelt.actualBounds.isReal() &&
            selelt.isVisibleObject() &&
            part.canReshape() &&
            part.actualBounds.isReal() &&
            part.isVisible() &&
            selelt.geometry.type === go.Geometry.Path
          ) {
            var adornment = part.findAdornment(this.name);
            if (adornment === null) {
              adornment = this.makeAdornment(selelt);
            }
            if (adornment !== null) {
              // update the position/alignment of each handle
              var geo = selelt.geometry;
              var b = geo.bounds;
              // update the size of the adornment
              adornment.findObject("BODY").desiredSize = b.size;
              adornment.elements.each(function (h) {
                if (h._typ === undefined) return;
                var fig = geo.figures.elt(h._fig);
                var seg = fig.segments.elt(h._seg);
                var x = 0;
                var y = 0;
                switch (h._typ) {
                  case 0:
                    x = fig.startX;
                    y = fig.startY;
                    break;
                  case 1:
                    x = seg.endX;
                    y = seg.endY;
                    break;
                  case 2:
                    x = seg.point1X;
                    y = seg.point1Y;
                    break;
                  case 3:
                    x = seg.point2X;
                    y = seg.point2Y;
                    break;
                }
                h.alignment = new go.Spot(0, 0, x - b.x, y - b.y);
              });

              part.addAdornment(this.name, adornment);
              adornment.location = selelt.getDocumentPoint(go.Spot.TopLeft);
              adornment.angle = selelt.getDocumentAngle();
              return;
            }
          }
        }
        part.removeAdornment(this.name);
      };

      /*
       * @this {GeometryReshapingTool}
       */
      GeometryReshapingTool.prototype.makeAdornment = function (selelt) {
        var adornment = new go.Adornment();
        adornment.type = go.Panel.Spot;
        adornment.locationObjectName = "BODY";
        adornment.locationSpot = new go.Spot(
          0,
          0,
          -selelt.strokeWidth / 2,
          -selelt.strokeWidth / 2
        );
        var h = new go.Shape();
        h.name = "BODY";
        h.fill = null;
        h.stroke = null;
        h.strokeWidth = 0;
        adornment.add(h);

        var geo = selelt.geometry;
        // requires Path Geometry, checked above in updateAdornments
        for (var f = 0; f < geo.figures.count; f++) {
          var fig = geo.figures.elt(f);
          for (var g = 0; g < fig.segments.count; g++) {
            var seg = fig.segments.elt(g);
            var h;
            if (g === 0) {
              h = this.makeHandle(selelt, fig, seg);
              if (h !== null) {
                h._typ = 0;
                h._fig = f;
                h._seg = g;
                adornment.add(h);
              }
            }
            h = this.makeHandle(selelt, fig, seg);
            if (h !== null) {
              h._typ = 1;
              h._fig = f;
              h._seg = g;
              adornment.add(h);
            }
            if (
              seg.type === go.PathSegment.QuadraticBezier ||
              seg.type === go.PathSegment.Bezier
            ) {
              h = this.makeHandle(selelt, fig, seg);
              if (h !== null) {
                h._typ = 2;
                h._fig = f;
                h._seg = g;
                adornment.add(h);
              }
              if (seg.type === go.PathSegment.Bezier) {
                h = this.makeHandle(selelt, fig, seg);
                if (h !== null) {
                  h._typ = 3;
                  h._fig = f;
                  h._seg = g;
                  adornment.add(h);
                }
              }
            }
          }
        }
        adornment.category = this.name;
        adornment.adornedObject = selelt;
        return adornment;
      };

      /*
       * @this {GeometryReshapingTool}
       */
      GeometryReshapingTool.prototype.makeHandle = function (selelt, fig, seg) {
        var h = this.handleArchetype;
        if (h === null) return null;
        return h.copy();
      };

      /*
       * @this {GeometryReshapingTool}
       */
      GeometryReshapingTool.prototype.canStart = function () {
        if (!this.isEnabled) return false;

        var diagram = this.diagram;
        if (diagram === null || diagram.isReadOnly) return false;
        if (!diagram.allowReshape) return false;
        if (!diagram.lastInput.left) return false;
        var h = this.findToolHandleAt(
          diagram.firstInput.documentPoint,
          this.name
        );
        return h !== null;
      };

      /**
       * @this {GeometryReshapingTool}
       */
      GeometryReshapingTool.prototype.doActivate = function () {
        var diagram = this.diagram;
        if (diagram === null) return;
        this._handle = this.findToolHandleAt(
          diagram.firstInput.documentPoint,
          this.name
        );
        if (this._handle === null) return;
        var shape = this._handle.part.adornedObject;
        if (!shape) return;
        this._adornedShape = shape;
        diagram.isMouseCaptured = true;
        this.startTransaction(this.name);
        this._originalGeometry = shape.geometry;
        this.isActive = true;
      };

      /**
       * @this {GeometryReshapingTool}
       */
      GeometryReshapingTool.prototype.doDeactivate = function () {
        this.stopTransaction();

        this._handle = null;
        this._adornedShape = null;
        var diagram = this.diagram;
        if (diagram !== null) diagram.isMouseCaptured = false;
        this.isActive = false;
      };

      /**
       * @this {GeometryReshapingTool}
       */
      GeometryReshapingTool.prototype.doCancel = function () {
        var shape = this._adornedShape;
        if (shape !== null) {
          // explicitly restore the original route, in case !UndoManager.isEnabled
          shape.geometry = this._originalGeometry;
        }
        this.stopTool();
      };

      /**
       * @this {GeometryReshapingTool}
       */
      GeometryReshapingTool.prototype.doMouseMove = function () {
        var diagram = this.diagram;
        if (this.isActive && diagram !== null) {
          var newpt = this.computeReshape(diagram.lastInput.documentPoint);
          this.reshape(newpt);
        }
      };

      /**
       * @this {GeometryReshapingTool}
       */
      GeometryReshapingTool.prototype.doMouseUp = function () {
        var diagram = this.diagram;
        if (this.isActive && diagram !== null) {
          var newpt = this.computeReshape(diagram.lastInput.documentPoint);
          this.reshape(newpt);
          this.transactionResult = this.name; // success
        }
        this.stopTool();
      };

      /**
       * @expose
       * @this {GeometryReshapingTool}
       * @param {Point} newPoint the value of the call to {@link #computeReshape}.
       */
      GeometryReshapingTool.prototype.reshape = function (newPoint) {
        var shape = this.adornedShape;
        if (shape === null || shape.geometry === null) return;
        var locpt = shape.getLocalPoint(newPoint);
        var geo = shape.geometry.copy();
        var type = this.handle._typ;
        if (type === undefined) return;
        var fig = geo.figures.elt(this.handle._fig);
        var seg = fig.segments.elt(this.handle._seg);
        switch (type) {
          case 0:
            fig.startX = locpt.x;
            fig.startY = locpt.y;
            break;
          case 1:
            seg.endX = locpt.x;
            seg.endY = locpt.y;
            break;
          case 2:
            seg.point1X = locpt.x;
            seg.point1Y = locpt.y;
            break;
          case 3:
            seg.point2X = locpt.x;
            seg.point2Y = locpt.y;
            break;
        }
        var offset = geo.normalize(); // avoid any negative coordinates in the geometry
        shape.desiredSize = new go.Size(NaN, NaN); // clear the desiredSize so Geometry can determine size
        shape.geometry = geo; // modify the Shape
        var part = shape.part; // move the Part holding the Shape
        part.ensureBounds();
        if (
          part.locationObject !== shape &&
          !part.locationSpot.equals(go.Spot.Center)
        ) {
          // but only if the locationSpot isn't Center
          // support the whole Node being rotated
          part.move(part.position.copy().subtract(offset.rotate(part.angle)));
        }
        this.updateAdornments(part); // update any Adornments of the Part
        this.diagram.maybeUpdate(); // force more frequent drawing for smoother looking behavior
      };

      /**
       * @expose
       * @this {GeometryReshapingTool}
       * @param {Point} p the point where the handle is being dragged.
       * @return {Point}
       */
      GeometryReshapingTool.prototype.computeReshape = function (p) {
        return p; // no constraints on the points
      };

      this.diagram.toolManager.mouseDownTools.insertAt(
        1,
        new GeometryReshapingTool()
      );

      if (this.diagram2) this.diagram2.div = null;
      this.diagram2 = GO(
        go.Palette,
        this.$refs.myPaletteDiv, // must name or refer to the DIV HTML element
        {
          maxSelectionCount: 1,
          nodeTemplateMap: this.diagram.nodeTemplateMap, // share the templates used by myDiagram
          model: new go.GraphLinksModel([
            {
              category: "11",
              text: "方地",
              content: "sssssssssss",
              name: "地块",
              title: "苗木",
              pickey: "static/img/0022222.png",
              // figure: "Circle",
              //   fill: "#00AD5F"
            },
            // ,{
            //   category:"FreehandDrawing-1",name: "地块",
            //   title: "苗木",
            // }
            {
              category: "FreehandDrawing-2",
              name: "地块",
              title: "苗木",
              pickey: "static/img/0022222.png",
            },
          ]),
        }
      );

      this.diagram.model = go.Model.fromJson(this.load4_3());
      //   this.diagram.findNodeForKey("-1").data.fill = "lightgreen";

      var node = this.diagram.model.findNodeDataForKey("-1"); //首先拿到这个节点的对象
      this.diagram.model.setDataProperty(node, "fill", "lightgreen"); //更改节点属性值
      this.diagram.model.setDataProperty(node, "text", "aaaaaaaaaaaaaaa"); //更改节点属性值
    },
    init4_2() {
      //取得画布的数据，
      let model = this.diagram.model.toJson();
      console.info("model====" + model);
    },
    load4_3() {
      //可以初始化加载时，直接加载已有数据
      return {
        class: "GraphLinksModel",
        nodeDataArray: [
          {
            category: "11",
            text: "东1-1",
            name: "东1-1",
            title:
              "22222222222222222222222\n33333333333333333333\n4444444444444444444444",
            key: -1,
            loc: "267 129",
          },
          {
            category: "11",
            text: "东2-1",
            name: "东2-1",
            title:
              "22222222222222222222222\n33333333333333333333\n4444444444444444444444",
            key: -2,
            loc: "268 184",
            size: "214 82",
          },
          {
            category: "11",
            text: "方地",
            name: "地",
            title:
              "22222222222222222222222\n33333333333333333333\n4444444444444444444444",
            key: -3,
            loc: "50 20",
            size: "68 207",
            fill: "lightgreen",
          },
          {
            category: "FreehandDrawing-2",
            key: -4,
            geo:
              "F M29.057239042362767 18.801742909764215 L0 18.801742909764215 L0 0 L88.19726674034837 0.6836997421732462 L109.73380861880548 49.568231307560126 L104.60606055250616 78.9673202210096z",
            loc: "864.2973927747853 136.38608674645923",
            name: "东6-6",
            title: "7.2亩\n 卫予秋",
          },
        ],
        linkDataArray: [],
      };
    },
    init4_fit1(type) {
      if (this.diagram) {
        if (type === 0) {
          this.diagram.commandHandler.canResetZoom(1.5); //还原为指定大小，不能比最小小
          this.diagram.commandHandler.resetZoom(2); //还原为指定大小，不能比最小小
        } else if (type === 1) {
          this.diagram.commandHandler.increaseZoom(1.1); //放大
        } else if (type === -1) {
          // this.diagram.commandHandler.canDecreaseZoom(0.5);//
          this.diagram.commandHandler.decreaseZoom(0.9); //缩小
        }
        // this.diagram.commandHandler.zoomToFit();//在初始大小和最近一次大小之间切换
      }
    },
  },
  mounted() {
    if (this.diagram) this.diagram.div = null;
    if (this.diagram2) this.diagram2.div = null;
  },
};
</script>

<style scoped>
.lean {
  height: 600px;
  width: 1000px;
}
</style>