
export const googleLogin= (req: any, res: any) => {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication failed" });
      }
  
      // Send tokens as response
      res.cookie("refreshToken", req.user.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION",
        sameSite: "Strict",
      });
      res.redirect("https://upgraded-space-meme-gv67xr5w9572wvx9-3000.app.github.dev/admin/home");
    //   res.json({
    //     accessToken: req.user.accessToken,
    //     refreshToken: req.user.refreshToken, // Optional (can be stored in cookies)
    //   });
    }
  
 

