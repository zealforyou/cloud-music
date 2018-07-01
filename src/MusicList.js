//抓包接口http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=JULY&page=1&pagesize=20&showtype=1
//http://www.kugou.com/yy/index.php?r=play/getdata&hash=25a8a5ee71898435f99bdfdd21f3f6e3
const data = [
   {
      name: "阿楚姑娘",
      author: "梁凡",
      url: "http://fs.w.kugou.com/201807010210/d4a810c02b9a376c05fc4b8cdf98b3d0/G060/M09/18/03/3IYBAFb3JseADR7qADyQcFvqL_s275.mp3",
      pic: "http://singerimg.kugou.com/uploadpic/softhead/400/20161229/20161229222159728.jpg",
      lrc1:require('./lrcs/阿楚姑娘')
   }
   ,
   {
      name: "亲人",
      author: "亲人",
      // url: "http://fs.w.kugou.com/201807011623/3e39bb105dea585368dee96708ceb6ce/G007/M02/01/17/p4YBAFS6TXaAbdrmAD_3ge0bKO4769.mp3",
      url: require('./愿你安好.mp3'),
      pic: require('./img/qingren.jpg'),
      lrc1:require('./lrcs/祝福.txt')
   }
   ,
   {
      name: "回忆",
      author: "回忆",
      url: "http://fs.w.kugou.com/201807011559/f28232a89420adbe28a2eaa71cee6353/G008/M02/18/10/qIYBAFULdwaANYXLAHu2NDMRfNI115.mp3",
      pic: "http://www.36588.com.cn:8080/ImageResourceMongo/UploadedFile/dimension/big/66d10429-8765-4d53-ac37-0b996427e933.png",
      lrc1:require('./lrcs/回忆')
   }
   ,
   {
      name: "愿你安好",
      author: "曹寅",
      url: "http://fs.w.kugou.com/201807010224/a3efd33cb7e2930756969bf8a688b0dc/G077/M09/17/04/7YYBAFhLv8uANc2WAEcujAn9bQw766.mp3",
      pic: "http://singerimg.kugou.com/uploadpic/softhead/400/20140704/20140704131920952639.jpg",
      lrc1:require('./lrcs/愿你安好')
   }
   ,
   {
      name: "说散就散",
      author: "前任3主题曲",
      url: "http://fs.w.kugou.com/201807010221/85a42e7947a89b99b79fbae0397bfa5b/G118/M08/04/15/FocBAFovr0CALbDLADifZa9XM2s464.mp3",
      pic: "http://singerimg.kugou.com/uploadpic/softhead/400/20180619/20180619155613194.jpg",
      lrc1:require('./lrcs/说散就散')
   }
   ,
   {
      name: "Mad Clown、金娜英 - 다시 너를 (TV)",
      author: "金娜英",
      url: "http://fs.w.kugou.com/201807010149/e9895f484025b55baf94d4e87b99c7d5/G063/M02/1C/01/fw0DAFcshSuAOtF4ADBXGZxtp40747.mp3",
      pic: "http://singerimg.kugou.com/uploadpic/softhead/400/20170204/20170204125005463.jpg",
      lrc1:require('./lrcs/金娜英')
   }
   ,
   {
      name: "胡66 - 差一步",
      author: "胡66",
      url: "http://fs.w.kugou.com/201807010110/ab290f97acfa296dac304e2a1ec722ad/G126/M07/18/19/XpQEAFqyHDCAKxINADxEvsPc60k313.mp3",
      pic: "http://singerimg.kugou.com/uploadpic/softhead/400/20171221/20171221210749388.jpg",
      lrc1:require('./lrcs/差一步')
   }
   ,
   {
      name: "다시만난 너에게 (再次见到你)",
      author: "匹诺曹电视剧",
      url: "http://fs.w.kugou.com/201806290944/7337145c852f57b857f4200230369ee7/G013/M04/1C/10/rYYBAFUKKwiAXksNAENSiS8g0FY088.mp3",
      pic: "http://singerimg.kugou.com/uploadpic/softhead/400/20150115/20150115110731240315.jpg",
      lrc1:require('./lrcs/再次见到你.lrc')
   }
   ,
   {
      name: "Me and My Guitar",
      author: "Tep No",
      url: "http://fs.w.kugou.com/201806281220/0dae43e17432a1de8edd95b8eb4c4ff3/G063/M05/10/0D/H5QEAFa0ueuADWjDADxYVTTuoqI097.mp3",
      pic: "http://singerimg.kugou.com/uploadpic/softhead/400/20150716/20150716133215366556.jpg",
   }
   ,
   {
      name: "Solo Dance)",
      author: "抓包",
      url: "http://fs.w.kugou.com/201806261009/8c2a8ab79e816e8da6e0640529736bbb/G080/M04/19/1D/8IYBAFgeWYSAAr36ACq5lbsvexo309.mp3",
      pic: "http://singerimg.kugou.com/uploadpic/softhead/400/20160802/20160802172904831.jpg",
   }
   ,

   {
      name: "JULY",
      author: "抓包",
      url: "http:\\/\\/fs.w.kugou.com\\/201806252332\\/c87e4f0c659dfb77066df786c10cdbb3\\/G076\\/M05\\/10\\/19\\/LJQEAFgcRpWAcCWaAC2iwNYOB0w548.mp3",
      pic: "http:\\/\\/singerimg.kugou.com\\/uploadpic\\/softhead\\/400\\/20180525\\/20180525225705340.jpg",
      lrc1:require('./lrcs/JULY')
   }
   ,
   {
      name: "Here She Comes Again",
      author: "抓包",
      url: "http://fs.w.kugou.com/201806271312/0ffd75595fe8bb4223e015503a3fd3c3/G031/M04/13/05/v4YBAFXseXeAJ2xPAEnRa_-AZu8382.mp3",
      pic: "http://singerimg.kugou.com/uploadpic/softhead/400/20140526/20140526173803192057.jpg",
   }
   ,
   {
      name: "Higher",
      author: "抓包",
      url: "http://fs.w.kugou.com/201806280024/23b868066993f170fb77f40ef3632f62/G041/M01/10/1F/yYYBAFYk1vqAZH6zADQgKSvEwxg992.mp3",
      pic: "http://singerimg.kugou.com/uploadpic/softhead/400/20160330/20160330153616731532.jpg",
   }
   ,
   {
      name: "凉凉 (王者荣耀版)",
      author: "抓包",
      url: "http://fs.w.kugou.com/201806260955/e60b2f013dd35bec9677cec8a1df4437/G102/M03/1A/05/BocBAFkpUeGAZ8IaAEnAk_ytX3c314.mp3",
      pic: "http://singerimg.kugou.com/uploadpic/softhead/400/20170603/20170603111817154.jpg",
   }
   ,

   {
      name: "123我爱你",
      author: "新乐尘符",
      url: "http://up.mcyt.net/?down/45965.mp3",
      pic: 'http://oeff2vktt.bkt.clouddn.com/image/76.jpg',
      lrc1:require('./lrcs/123我爱你')
   }
   ,
   {
      name: "Closer",
      author: "The Chainsmokers&Halsey",
      url: "http://up.mcyt.net/?down/44450.mp3",
      pic: "http://oeff2vktt.bkt.clouddn.com/image/20.jpg"
   }
   ,
   {
      name: "Friendships",
      author: "Pascal Letoublon",
      url: "http://up.mcyt.net/?down/46249.mp3",
      pic: "http://oeff2vktt.bkt.clouddn.com/image/3.jpg"
   }
   ,

   {
      name: "Something Just Like This",
      author: "The Chainsmokers",
      url: "http://up.mcyt.net/?down/45372.mp3",
      pic: "http://oeff2vktt.bkt.clouddn.com/image/34.jpg",
      lrc1:require('./lrcs/人生谏言.txt')
   }
   ,
   {
      name: "那个人",
      author: "周延英(英子-effie)",
      url: "http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3",
      pic: "https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7edd1607dd1373f0f53f68999c342cc6/caef76094b36acaf8143188070d98d1001e99c2f.jpg"
   }
   ,
   {
      name: "起风了",
      author: "买辣椒也用券 ",
      url: "http://sc1.111ttt.cn:8282/2018/1/03m/13/396131213056.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3",
      pic: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529606681312&di=370e4423d4ac0233d5970dd679273f1b&imgtype=0&src=http%3A%2F%2Fimg.zhiribao.com%2Fupload%2Fimages%2F201608%2F0%2F02ca30371834a9950ccbff1404e992378a48e15e.jpg"
   }
   ,
   {
      name: "野子",
      author: "苏运莹&田馥甄",
      url: "http://up.mcyt.net/?down/47883.mp3",
      pic: "http://oeff2vktt.bkt.clouddn.com/image/73.jpg"
   }
   ,
   {
      name: "Animals",
      author: "抓包",
      url: "http://fs.w.kugou.com//201806252328//e91f84bb9be416cbc348dafd4ca6f4bf//G035//M08//17//09//Yw0DAFWfrL6Abvm1ACKuXr8EufM029.mp3",
      pic: "http:\\/\\/singerimg.kugou.com\\/uploadpic\\/softhead\\/400\\/20180525\\/20180525225705340.jpg"
   }
   ,
  ];

export default data;