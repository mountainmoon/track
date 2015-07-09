## 使用说明

- 普通页面

        // 获取 collector 实例
        var collector = track('collector');

        // 初始化.
        collector.init();

        // 在页面载入后以page的name(在字典中定义),以及可选的properties参数来调用
        collector.page('st.index', {version: '20150706'});

        // 鉴别用户,根据segment的文档,通常应该联系上用户的一些特征量traits,比如邮箱,用户名之类的,但是目前定义的字典中
        // 未加入这些,应当考虑加入,否则调用这个方法没有任何意义.[todo]
        collector.identify();

        // 记录用户的行为事件,以事件名以及一些属性来调用
        collector.track('st.index.lng', {language: 'en'});


- tracking iframe 页面

        //如下初始化即可
        track('sender').init();


next step:

1.应当使用异步加载的方式来加载track.js, 就像加载analytics.js的方式一样, 这样就不会阻塞页面的加载, 万一track.js挂了也不影响.

2.直接把collector中的方法导出到track中, 避免多个全局变量.