This is a clone of Infinite Mario, written in JavaScript for web browsers using HTML5.

A good demonstration of what can be accomplished with the Canvas and Audio elements.

Background music currently does not work in any browser besides Firefox 4. I think. There were too many problems with other browsers.

Ported from the Java version by Notch (Markus Persson).

---

# TODO: 

* 添加水平的管道 
  位于 levelGenerator.js中，参考 BuildTubes ，添加函数 BuildTubesHori(level, xo, maxLength, leftOrRight) , 这里的前三个参数与 BuildTubes 中的意义相同，第4个参数为0或1，表示管口朝左(0)和管口朝右(1)。同时，在Odds中添加对应的项，并修改BuildZone中switch语句里面对应的项

* 修改地图
  这部分主要是体力劳动了，代码主要集中在level.js以及levelGenerator.js中。(其实这里我也没有完全理清)
  level.js中的LoadBehaviors函数，里面的b，表示的是每一个砖块的性质(但我暂时还不知道这个东西是怎么用的)。这个b的值是这么理解的，将这个值转为二进制，每一位代表一个性质。这里的b数组的长度是256，但我们并不需要这么多的，只需要改某些值就可以了。
  然后levelGenerator.js中，主要是在CreateLevel这个函数里，这个函数的参数type就默认为Castle, difficulty默认为1吧，然后FixWalls和Blockify两个函数可能也要改一下。
  要注意的就是我们实际只需要20*16格子的地图，这个要控制一下。

* 生成怪物
  我们只需要能够从管道里不断生成RedKoopa就可以了。代码位于levelGenerator.js的AddEnemyLine中(貌似)

* 踩乌龟
  需求文档里写的是，踩乌龟，第一下乌龟翻过来，第二下踩死。而现在这个游戏里第二下踩了会让乌龟开始漂移。这个应该比较好写，可以全局搜索collide，找到相应的函数修改。
