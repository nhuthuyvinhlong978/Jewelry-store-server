const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

let isAuth = async (req, res, next) => {
  // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
  const tokenFromClient =
    req.body.token || req.query.token || req.header("authorization");

  if (tokenFromClient) {
    //neu ton tai
    try {
      if (tokenFromClient === process.env.TOKEN_CITI_SHIP) {
        next();
      } else {
        //thực hiện giải mã token xem có hợp lệ ko
        const decoded = await jwtHelper.verifyToken(
          tokenFromClient,
          accessTokenSecret
        );
        //nếu token hop le, lưu thông tin giải mả được vào đối tượng req, dùng cho các xử lý ở phía sau.
        req.jwtDecoded = decoded;

        // cho phep req đi tiếp sang controller
        next();
      }
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};

// const isAuthShip = async (req, res, next) => {
//   const tokenFromClient =
//     req.body.token || req.query.token || req.header("authorization");
//   if (tokenFromClient) {
//     //neu ton tai
//     try {
//       if (tokenFromClient === process.env.TOKEN_CITI_SHIP) {
//         next();
//       } else {
//         return res.status(401).json({
//           message: "Unauthorized.",
//         });
//       }
//     } catch (error) {
//       return res.status(401).json({
//         message: "Unauthorized.",
//       });
//     }
//   } else {
//     return res.status(403).send({
//       message: "No token provided.",
//     });
//   }
// };

module.exports = {
  isAuth: isAuth,
  // isAuthShip: isAuthShip,
};
