#   食堂点餐app：商家端（页面及逻辑）

制作：陈凯鹏（采用VUE+VANT完成，页面设计主要为直接使用vant的组件节省自己设计前端UI难看耗时的问题vant地址https://youzan.github.io/vant/#/zh-CN/image-preview，文档里面内容一致可以不看）

1：主页菜品：通过接口获取对应分类的菜<img src="https://i.loli.net/2020/11/12/2nkSjrwCYR3h6Fs.png" style="zoom:50%;" />

在主页将信息显示出来，点击不同分类重复此操作get的type不同而已，并将菜品的信息l储存在本地对应list

<img src="https://i.loli.net/2020/11/12/iPN9nmsQdtgH83L.png" style="zoom:50%;" />

2增加菜品请求（后端应该详尽描述了各个接口的功能接下来这里只讲逻辑）请求接口/Canteen/InsertDishes

<img src="https://i.loli.net/2020/11/12/d9xkKjDSwMTc7ie.png" style="zoom:50%;" /> <img src="https://i.loli.net/2020/11/12/w2kplqO6PmXHRiv.png" style="zoom:50%;" />

荤菜下拉框选择菜品分类（1荤菜2素菜3汤粥）点击上方图片区选择本地图片，并预览，在下面三个输入框分别输入价格，数量和菜名。确认后请求接口，返回成功与否。

<img src="https://i.loli.net/2020/11/12/finNv8xPdbp2rEH.png" style="zoom:50%;" />

成功后主页重新请求菜品

<img src="https://i.loli.net/2020/11/12/6EtOQ25hrAl3fgR.png" style="zoom:50%;" />

3删除菜品，点击删除菜品，页面逻辑获取对应list下对应的菜的id并通过接口（http://121.89.164.154:8989/Canteen/DeleteDishes?id=23），通过菜的id删除菜品，返回成功后刷新页面。

4修改菜品数量，点击修改数量按钮弹出，修改弹出框，输入数量确认，将对应菜的id和数量通过接口（http://121.89.164.154:8989/Canteen/UpdateDishes?id=1&number=100），修改，成功后刷新界面显示修改后菜品数量

<img src="https://i.loli.net/2020/11/12/hiDcvVfnPKmuoWT.png" style="zoom:50%;" />

5获取用户订单，点击订单界面获取未完成订单，初始为空，下拉刷新，接口（http://121.89.164.154:8989/Canteen/OrderUnfinished）get未完成订单并显示，

<img src="https://i.loli.net/2020/11/12/UzKqGvHtkLerY8T.png" style="zoom:50%;" /> <img src="https://i.loli.net/2020/11/12/SeyC4TqNpfxOQaW.png" style="zoom:50%;" />

6点击已完成按钮，传对应订单的id给后端（/Canteen/UpdateOrderState?id=）完成订单，并刷新订单显示。