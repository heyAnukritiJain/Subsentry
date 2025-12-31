import { getAuth } from "@clerk/express";


export const requireAuth = (req, res, next) => {

  if (process.env.USE_MOCK_AUTH === "true") {
    req.auth = {
      userId: "mock_user_123",
    };
    return next();
  }
  
  const auth = getAuth(req);

  if (!auth || !auth.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  req.auth = auth;
  next();
};
