export interface PostDB {
    id?: number;
    url: string; // "/post",
    img: string; // "/img/4.jpg",
    title: string; // "Beauty undefined in Sunlight",
    annotation: string; // `Fly, air beast evening yielding you it seas Void above is let male.`
    date: number; // "February 18, 2014",
    author: string;  //"By Ceyron Louis",
    author_link: string; // "https://plus.google.com/114804705990631494102",
    category: string; //"Extras",
    category_url: string // "extras"
    body: string;
    isPublic: string;
    featured: string;
}