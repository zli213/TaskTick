
export default function handler(req, res) {
  console.log("inside ")
  if (req.method === 'POST') {
 
    console.log(req.body); // 输出接收到的数据
    res.status(200).json({ message: 'success' });
  } else {
    // 处理其他 HTTP 方法
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}