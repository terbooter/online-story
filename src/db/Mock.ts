import { PostDB } from "./PostDB";
export class Mock {
    public static postDB: PostDB = {
        url: "post",
        img: "/img/4.jpg",
        title: "Beauty undefined in Sunlight",
        annotation: `Fly, air beast evening yielding you it seas Void above is let male.
    Made lights bearing signs blessed sixth which after morning.
    Image living were unto subdue fifth. Sixth sea behold unto subdue their seas`,
        date: 0,
        isPublic: "",
        author: "By Ceyron Louis",
        author_link: "https://plus.google.com/114804705990631494102",
        category: "Extras",
        category_url: "extras",
        body: `
        <p>
        Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн.
        Его популяризации в новое время послуf gfжили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и,
         в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
        </p>
        [img]
        <p>
        Lorem Ipsum не только успешно пережил d без заметных изменений пять веков, но и перешагнул в электронный дизайн.
        Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и,
         в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
        </p>
        <p>
        Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн.
        Его популяризации в новое врd   емя послужили  публикация л истов Letrase   с образцами Lorem Ipsum в 60-х годах и,
         в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблона х которых используется Lorem Ipsum.
        </p>
        <p>
        Lorem Ipsum не только успешно пережил без заметных изменений пять веков,  но и перешагнул в электронный дизайн.
        Его популяризации в новое время послужили пу й вёрстки  типа Aldus PageMa  ker, в шаблонах которых используется Lorem Ipsum.
        </p>
`
    };

    public static featuredPost1: PostDB = {
        title: "I ordered a dish and finally it arrived",
        category: "Sport",
        url: "post1",
        body: `
            <p>Some Text</p>
            [img]
            <p>Some Text</p>
        `,
        author: "Bill",
        author_link: "/",
        date: 0,
        isPublic: "",
        img: "/img/1.jpg",
        category_url: "/",
        annotation: "some annotaion"

    };

    public static featuredPost2: PostDB = {
        title: "I ordered a dish and finally it arrived",
        category: "Sport",
        url: "post2",
        body: `
            <p>Some Text</p>
            [img]
            <p>Some Text</p>
        `,
        author: "Bill",
        author_link: "/",
        date: 0,
        isPublic: "",
        img: "/img/2.jpg",
        category_url: "/",
        annotation: "some annotaion"
    };

    public static featuredPost3: PostDB = {
        title: "I ordered a dish and finally it arrived",
        category: "Sport",
        url: "post3",
        body: `
            <p>Some Text</p>
            [img]
            <p>Some Text</p>
        `,
        author: "Bill",
        author_link: "/",
        date: 0,
        isPublic: "",
        img: "/img/3.jpg",
        category_url: "/",
        annotation: "some annotaion"

    };

    public static featuredPost4: PostDB = {
        title: "I ordered a dish and finally it arrived",
        category: "Sport",
        url: "post4",
        body: `
            <p>Some Text</p>
            [img]
            <p>Some Text</p>
        `,
        author: "Bill",
        author_link: "/",
        date: 0,
        isPublic: "",
        img: "/img/4.jpg",
        category_url: "/",
        annotation: "some annotaion"

    };
}