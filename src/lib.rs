#![deny(clippy::all)]
use memmap::MmapOptions;
use std::fs::OpenOptions;
// use std::thread;
// use std::time::Duration;
#[macro_use]
extern crate napi_derive;

// #[napi]
// pub fn sum(a: i32, b: i32) -> i32 {
//   a + b
// }
// #[napi]
// pub struct Mmap {
//   pub path: String,
//   pub max_size: u32,
//   mmap: MmapMut,
//   file: File,
//   data_len: usize,
// }
// #[napi]
// impl Mmap {
//   #[napi(constructor)]
//   pub fn new(path: String, max_size: u32) -> Result<Self, std::io::Error> {
//     let file = OpenOptions::new()
//       .read(true)
//       .write(true)
//       .create(true)
//       .open(&path)?;

//     // 将文件映射到内存中
//     let mmap = unsafe { MmapOptions::new().len(max_size as usize).map_mut(&file)? };
//     Ok(Mmap {
//       path,
//       max_size,
//       mmap,
//       file,
//       data_len: 0,
//     })
//   }
//   #[napi]
//   pub fn write(&mut self, data: String) {
//     // 写入数据
//     let data_len = data.len();
//     self.data_len = data_len;
//     thread::sleep(Duration::from_millis(1000));
//     if data_len as u32 <= self.max_size {
//       self.mmap[0..data_len].copy_from_slice(data.as_bytes());
//       self.file.set_len(data_len as u64).unwrap();
//     } else {
//       println!("File size exceeds maximum size");
//     }
//   }
//   #[napi]
//   pub fn read(&self) {
//     let data = &self.mmap[0..self.data_len];
//     println!("{}", std::str::from_utf8(data).unwrap());
//   }
// }

// #[napi]
// async fn async_add(num1: u32, num2: u32) -> u32 {
//   thread::sleep(Duration::from_millis(1000));
//   num1 + num2
// }

// struct GpioRegister {
//   cfg: [u32; 4],
//   data: u32,
//   drv: [u32; 2],
//   pul: [u32; 2],
// }

#[napi]
pub struct GpioControl {
  gpio_register: *mut u32,
  mem_fd: std::fs::File,
  gpio_map: memmap::MmapMut,
}

#[napi]
impl GpioControl {
  #[napi(constructor)]
  pub fn new(base: u32, offset: u32) -> Self {
    const BLOCK_SIZE: usize = 4096; // 以4KB为块大小

    // const GPIO_BASE: u64 = 0x0300B000; // 假设使用的GPIO基地址为0x20000000
    // const PIO_ADDR_OFFSET: u32 = 0x0024;
    // 2 * PIO_ADDR_OFFSET + 0x00

    // 打开/dev/mem并生成Mmap对象
    let mem_fd = OpenOptions::new()
      .read(true)
      .write(true)
      .open("/dev/mem")
      .expect("Failed to open /dev/mem");
    let gpio_map = unsafe {
      MmapOptions::new()
        .len(BLOCK_SIZE) // 映射的内存块大小为4KB
        .offset(base as u64) // 指定映射到 GPIO 的地址
        .map_mut(&mem_fd) // 以读写方式映射/dev/mem
        .expect("Failed to map GPIO memory")
    };
    let gpio_addr = (gpio_map.as_ptr() as *mut u32 as u64 + offset as u64) as *mut u32;
    GpioControl {
      gpio_register: gpio_addr,
      mem_fd,
      gpio_map,
    }
  }
  // #[napi]
  // pub fn set_mode(&mut self, offset: u32, val: u32) {
  //   unsafe {
  //     // *self.gpio_register.offset(0) &= 0x77777717;
  //     // *self.gpio_register.offset(1) &= 0x77777717;
  //     *self.gpio_register.offset(offset as isize) &= val;
  //   }
  // }
  #[napi]
  pub fn set_val(&mut self, offset: u32, val: u32) {
    unsafe {
      // *self.gpio_register.offset(4) ^= 0x00003000;
      // *self.gpio_register.offset(4) ^= 0x00000002;
      *self.gpio_register.offset(offset as isize) = val;
    }
  }
  #[napi]
  pub fn get_val(&mut self, offset: u32) -> u32 {
    unsafe { *self.gpio_register.offset(offset as isize) }
  }
}
