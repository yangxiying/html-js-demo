<template>
  <div>
    <div>
      <el-button @click="init1">加载</el-button>
      <el-button @click="getjson">取得画布的数据</el-button>
      <el-button @click="resert">还原</el-button>
      <el-button @click="add">++</el-button>
      <el-button @click="ind">--</el-button>
    </div>

    <div style="width: 100%; display: flex; justify-content: space-between">
      <div
        ref="myPaletteDiv"
        style="width: 105px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black"
      ></div>
      <div
        ref="myDiagramDiv"
        style="flex-grow: 1; height: 600px; width: 30px; border: solid 0px black"
      ></div>
    </div>
  </div>
</template>

<script>
import go from "gojs";
let $ = go.GraphObject.make;
let GO = $;
export default {
  data() {
    return {
      diagram: null,
      diagram2: null,
      show: true,
      imgsrc: "@/assets/map/map-y1.png",
    };
  },
  methods: {
    init1() {
      if (this.diagram) this.diagram.div = null;
      if (this.diagram2) this.diagram2.div = null;

      this.diagram = GO(
        go.Diagram,
        this.$refs.myDiagramDiv, // must name or refer to the DIV HTML element
        {
          //   "undoManager.isEnabled": true // enable undo & redo
          scale: 1, //初始视图大小比例
          minScale: 0.2, //最小视图的缩小比例
          maxScale: 20, //最大视图的放大比例
          "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, //鼠标滚轮事件
          initialContentAlignment: go.Spot.TopLeft,
          scaleComputation: function(d, newsc) {
              // only allow scales that are a multiple of 0.1
              var oldsc = Math.round(d.scale * 10);
              var sc = oldsc + ((newsc * 10 > oldsc) ? 1 : -1);
              if (sc < 1) sc = 1;  // but disallow zero or negative!
              return sc / 10;
            },
            "toolManager.hoverDelay": 100,

        }
      );
      let aa2 = this.diagram.height;
      let bb2 = this.diagram.width;
      console.info(aa2, bb2);

      let div = this.diagram.div;
      console.info("div", div);

      // let aa = this.$refs.myDiagramDiv.style.height;
      let aa = this.$refs.myDiagramDiv.getBoundingClientRect().width - 10;
      // let bb = this.$refs.myDiagramDiv.style.width;
      let bb = this.$refs.myDiagramDiv.getBoundingClientRect().height - 10;
      console.info(aa, bb);
      // this.diagram.div.style.height;

      // let aa = this.diagram.div.getBoundingClientRect().width
      // let bb = this.diagram.div.getBoundingClientRect().height

      this.diagram.model = go.Model.fromJson(this.initData());

      this.diagram.addDiagramListener("PartResized", function (e, a, b) {
        console.log(e);
      });
      this.diagram.add(
        GO(
          go.Part,
          // "Auto", // this Part is not bound to any model data
          {
            // width: 840,
            // height: 570,
            desiredSize: new go.Size(aa, bb),
            // desiredSize: new go.Size(600, 200),
            // desiredSize: new go.Size(1920, 1080),
            layerName: "Background",
            position: new go.Point(0, 0),
            // location: new go.Point(0, 0),
            // selectable: false,
            pickable: false,
            // movable: false, //是否可拖动
            locationSpot:go.Spot.TopCenter,
          },
          { stretch: go.GraphObject.Fill },
          GO(go.Picture, {
            // desiredSize: new go.Size(800, 800),source: "static/123.png"
            desiredSize: new go.Size(aa, bb),
            // desiredSize: new go.Size(600, 200),
            // desiredSize: new go.Size(1920, 1080),
            // source: this.imgsrc,
            source: "map/map-y1.png",
            imageStretch: go.GraphObject.Uniform, 
            //GraphObject.Fill  图片给占满了（如果图片小，会拉伸，如果图片大，会以图片为大小）, 
            //GraphObject.Uniform, 图片等比缩放不会拉伸，如果图片大，会以图片为大小展示
            // GraphObject.UniformToFill,图片大小填充，如果图片大小比设置的大，只填充设置的大小，其它看不见，
            //  and GraphObject.None. 
            //  The default is GraphObject.Fill.
            // margin: 2,
            // imageAlignment: go.Spot.TopLeft,
            // width: 580, height: 580
          })
        )
      );

      this.diagram.nodeTemplateMap.add(
        "11",
        $(
          go.Part,
          "Spot",
          {
            isShadowed: true, //是否月影
            shadowColor: "lightgreen",
            selectionAdorned: false, //选中时部件的边框是否显示
            locationSpot:go.Spot.TopCenter,
          },
          new go.AnimationTrigger("position", { duration: 2000 }),
          //相对位置
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          //形状大小
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
            go.Size.stringify
          ),
          $(
            go.Shape,
            {
              name: "Shape",
              geometryString:
                "F M0 0 L80 0 B-90 90 80 20 20 20 L100 100 20 100 B90 90 20 80 20 20z",
              fill: "transparent",
            },
            new go.Binding("fill"),
            {
              //   mouseEnter: function (e, node) {
              //     node.diagram.model.setDataProperty(node, "fill", "red");
              //     node.diagram.model.setDataProperty(node, "text", "red");
              //   },
              //   mouseLeave: function (e, node) {
              //     node.diagram.model.setDataProperty(node, "fill", "lightgreen");
              //   },
            }
          ),
          $(go.TextBlock, "custom shape", new go.Binding("text", "name"), {
            // mouseEnter: function (e, node) {
            //   node.diagram.model.setDataProperty(node, "text", "red");
            // },
            // mouseLeave: function (e, node) {
            //   node.diagram.model.setDataProperty(node, "text", "custom shape");
            // },
          }),
          {
            mouseEnter: function (e, node) {
              let shape = node.part.findObject("Shape");
              // debugger;
              if (shape) {
                //   shape.isHighlighted=true;
                shape.fill = "lightgreen";
                shape.fill = $(go.Brush, { color: "rgba(144,238,144,0.15)" });
                shape.stroke = "deepskyblue";
                shape.strokeWidth = 2;
                shape.strokeDashArray = [4, 2];
              }
            },
            mouseLeave: function (e, node) {
              let shape = node.part.findObject("Shape");
              if (shape) {
                shape.fill = "transparent";
                shape.stroke = "black";
                shape.strokeWidth = 1;
                shape.strokeDashArray = null;
              }
            },

            // selectionChanged: function (part) {
            //   var shape = part.elt(0);
            //   shape.fill = part.isSelected ? "red" : "white";
            // },
          }
        )
      );

      this.diagram.add(
        $(
          go.Node,
          "Vertical", // the whole node panel
          $(
            go.TextBlock, // the text label
            {
              text: "mytestsetset",
            },
            new go.Binding("text", "name")
          ),
          $(
            go.Picture, // the icon showing the logo
            // You should set the desiredSize (or width and height)
            // whenever you know what size the Picture should be.
            { desiredSize: new go.Size(75, 50) },
            new go.Binding("source", "picrul")
          )
        )
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
              // text: "方地",
              // content: "sssssssssss",
              name: "地块",
              // title: "苗木",
              // pickey: "static/img/0022222.png",
              key: "123",
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

      this.diagram.model = go.Model.fromJson(this.initData());
    },

    getjson() {
      //取得画布的数据，
      let model = this.diagram.model.toJson();
      console.info("model====" + model);
    },
    resert() {
      // this.diagram.commandHandler.resetZoom(1); //还原为指定大小，不能比最小小

      this.diagram.commandHandler.zoomToFit();//缩放到没有滚动条
    },
    add() {
      this.diagram.commandHandler.increaseZoom(1.1); //放大
    },
    ind() {
      this.diagram.commandHandler.decreaseZoom(0.9); //缩小
    },

    initData() {
      // setKeyForNodeData();

      return {
        // class: "GraphLinksModel",
        nodeDataArray: [
          {
            category: "11",
            name: "地块",
            key: "123",
            loc: "0 84.08333292007447",
          },
          {
            category: "FreehandDrawing-2",
            name: "地块",
            title: "苗木",
            pickey: "static/img/0022222.png",
            key: -2,
          },
          {
            category: "FreehandDrawing-2",
            name: "地块",
            title: "苗木",
            pickey: "static/img/0022222.png",
            key: -3,
          },
          {
            category: "11",
            name: "地块",
            key: "1232",
            loc: "121 84.08333292007447",
          },
          {
            category: "11",
            name: "地块",
            key: "12322",
            loc: "552 267.08333292007444",
          },
        ],
        // linkDataArray: [],
      };
    },
  },

  mounted() {
    if (this.diagram) this.diagram.div = null;
    if (this.diagram2) this.diagram2.div = null;
  },
};
</script>

<style>
</style>