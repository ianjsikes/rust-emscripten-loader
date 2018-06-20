#![feature(proc_macro)]
#[macro_use]

extern crate stdweb;

use stdweb::js_export;
use stdweb::traits::*;
use stdweb::unstable::TryInto;
use stdweb::web::{
    HtmlElement,
    Element,
    document
};

#[js_export]
fn hello() {

    stdweb::initialize();

    let hw = "HELLO FROM RUST";

    // This unwrap() stuff is from the stdweb examples -
    // https://github.com/koute/stdweb/blob/52cf01616a1a32ecf63af9858437d37be743b7dd/examples/echo/src/main.rs#L36
    let div: HtmlElement = document().query_selector("#container")
        .unwrap().unwrap().try_into().unwrap();

    let h1: Element = document().create_element("h1")
        .unwrap();

    h1.set_text_content(hw);
    div.append_child(&h1);

    js! {
        console.log(@{hw});
    }

}

#[js_export]
fn doub(a: i32) -> i32 {
    return a + a;
}
