#![deny(clippy::all)]
use memmap::{MmapMut, MmapOptions};
use std::fs::{File, OpenOptions};
use std::thread;
use std::time::Duration;

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn sum(a: i32, b: i32) -> i32 {
  a + b
}
#[napi]
pub struct Mmap {
  pub path: String,
  pub max_size: u32,
  mmap: MmapMut,
  file: File,
  data_len: usize,
}
#[napi]
impl Mmap {
  #[napi(constructor)]
  pub fn new(path: String, max_size: u32) -> Result<Self, std::io::Error> {
    let file = OpenOptions::new()
      .read(true)
      .write(true)
      .create(true)
      .open(&path)?;

    // 将文件映射到内存中
    let mmap = unsafe { MmapOptions::new().len(max_size as usize).map_mut(&file)? };
    Ok(Mmap {
      path,
      max_size,
      mmap,
      file,
      data_len: 0,
    })
  }
  #[napi]
  pub fn write(&mut self, data: String) {
    // 写入数据
    let data_len = data.len();
    self.data_len = data_len;
    thread::sleep(Duration::from_millis(1000));
    if data_len as u32 <= self.max_size {
      self.mmap[0..data_len].copy_from_slice(data.as_bytes());
      self.file.set_len(data_len as u64).unwrap();
    } else {
      println!("File size exceeds maximum size");
    }
  }
  #[napi]
  pub fn read(&self) {
    let data = &self.mmap[0..self.data_len];
    println!("{}", std::str::from_utf8(data).unwrap());
  }
}

#[napi]
async fn async_add(num1: u32, num2: u32) -> u32 {
  thread::sleep(Duration::from_millis(1000));
  num1 + num2
}
