import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/email.js"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (user.verifyCode && user.verifyCode != "verified")) {
    throw new Error("You are not verified. Please check your email inbox.");
  }
  
  if (user && !user.allowed) {
    throw new Error("You are not allowed. Ask a permission to admin.");
  }
  

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      super: process.env.SUPERUSER.split(",").indexOf(user.email) != -1
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  
  const verifyCode = uuidv4();
  const user = await User.create({
    name,
    email,
    password,
    verifyCode
  });

  if (user) {
    const mail = `<table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="width:100%">
      <tbody><tr>
          <td align="center" valign="top">
              
              <table class="m_1815589142183751782container m_1815589142183751782header" border="0" cellpadding="0" cellspacing="0" style="width:80%">
                  <tbody><tr>
                      <td style="padding:30px 0 30px 0;border-bottom:solid 1px #eeeeee" align="center">
                          <a href="https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/WLnEavwrJY5Nj6_RB01h3jbZXPePNezwOGe5ScGAe9Ult66cNfyYiUZsUAu5v1mEeId6lTHWKbU_lELbZazZR_BTm6pmWUz5N5S1V5ri-Fsn7VC2k4th-sHHNllHzSqbtsVBEG3w0FhsFGl0IgJ9ecrd6O9cCFBTJjmaaT_A0_VmrswcCXPvTy9RbdReCYJ-CAl43u3zPQYNWl2HPxnHCrSMYkAw_9HhLIvq32df-Be6QGANlGrfV_gSzWT1jPSOLZxdao5cZ6jfUB9iVa0w9wYNWZOF" style="font-size:30px;text-decoration:none;color:#000000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/WLnEavwrJY5Nj6_RB01h3jbZXPePNezwOGe5ScGAe9Ult66cNfyYiUZsUAu5v1mEeId6lTHWKbU_lELbZazZR_BTm6pmWUz5N5S1V5ri-Fsn7VC2k4th-sHHNllHzSqbtsVBEG3w0FhsFGl0IgJ9ecrd6O9cCFBTJjmaaT_A0_VmrswcCXPvTy9RbdReCYJ-CAl43u3zPQYNWl2HPxnHCrSMYkAw_9HhLIvq32df-Be6QGANlGrfV_gSzWT1jPSOLZxdao5cZ6jfUB9iVa0w9wYNWZOF&amp;source=gmail&amp;ust=1706165619211000&amp;usg=AOvVaw3UPVcIKeGXw7AEMKvC9wTT">
                            <img src="https://ci3.googleusercontent.com/meips/ADKq_NZn_QSgPcx6eMkP8QAieJZJIFGfah4U5JYbXp1S83RdzOUrzAr1e4oTP1kv6MchuOiBuAvJAxAMNJDW324yTD83L2OnioV4oRipURoDMmyTgGE25MSKJAS_Y6bSr_WlPPTRE2feYD1BCajeXvvudgFYVO1E_kAc42AZ3cxByE-Oq7X48VLUfHaDNUHRF4Papycn6XbOD4Hp6IP6S4C-QtGUTObU7V4u-LfVXFsTk1Aw-JYruC-_U9xhXWVLKSECEYj_CwQfqwAI4NJG0JUdcVK08AiyWknjeQdAcONbc2MLjw1WoNfFZjP14_ySaWGBPawebC53998zy02QCDeyl6NeP--WunA4fICGfZzi_Q0YsXuPIvC5_SfJWN8TyOyZ9vH09yPSoB_5eSVHcQ8eZf7iLZlUC6BXT3Ri1bMikLaDV2-3Hhmx8tvS7USgmrTMuz1lt92_kSaZQz8ChJKRBxfsGU4JFeYlTBbRM-gfBdwOV7lGWZeHkUfcgcJ73_u88bRWwbVsoGNCtPAJs8Juw0dSMsOngWPHNgJl0Bvudt3PLLe3f6zxwBpAaJzTrkyHp6CUKDs=s0-d-e1-ft#https://ehabhdi.r.bh.d.sendibt3.com/im/4701738/df92a2f7dd1019a5d035633c42cf101e1e87db1c84e3b7366fdc4b73916d5a3b.png?e=XIFl1pArmA4X1MDpCVEStXqrk3sFdvIBSA8-7YOso_FxT8W8D9Bko6kaClkFyWe0DlnkkP9TZLo7PXkBD7SbxhvayepeUQWKfHgMVyvH8uMm01ESXsIElGBnmltWgiSHtZcpmDryw9P7XuF0FT1OD-tKrmL5tFZT4FBVTo18h6dNdv6J4mCwzHhOkJcmRU4JbbGVGVTOz_scNEbm0jp_3Oz34S3ALrOJHs0z3-CLtlKRme7tMOEkBwKjZ2XuOjPtWerIoWlTzc9j0GErqkarhMQTKrbd-sCQc50W5EA" border="0" class="CToWUd" data-bit="iit" width="50%" >
                          </a>
                      </td>
                  </tr>
              </tbody></table>
              
              
              <table class="m_1815589142183751782container m_1815589142183751782title-block" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody><tr>
                      <td align="center" valign="top">
                          <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" style="width:80%">
                              <tbody><tr>
                                  <td style="border-bottom:solid 1px #eeeeee;padding:0 0 18px 0;font-size:26px" align="left">
                                    <center><br><a href="https://aicms.tmcmotors.co.uk/api/users/verify/${verifyCode}" style="text-decoration:none;line-height:100%;background:#5865f2;color:white;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;padding: 20px;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://click.discord.com/ls/click?upn%3Du001.a0NJ38DJJG1sulNx5wS1jjasHPOV5MgsCNLIOUybEqgv-2F76hJtte7st2YGE6B-2FX1y2Fxwqi-2B5q0bwfJfEpqNmODwZmejcnOydM4XV7IQLY7cfPiZLR8zPU1ghjEerKtjbcCkEi-2FP7u-2Bv3ZevfNz5sNI3xMuL052XB-2BqrRwHzsavtTpb7QjRIZHtB3scafI2Igsvh_Z8GnBSrkB34LMDrf9jG48l7A86fbxqUuqynm6oqlf2OzfFQpDUtuJ-2FY8FNbFifvA6KANI5gmeDGhiSwRa0Lmbb36SU-2BfVJBWqYAcB6azK5OKw52tgOzGI7c65-2Bnj41OePjT864SJFddYCfzWeaxBSlcr0QwLDvAmHOOGp32ldlT6j0ak4ma8NL-2F6CtAMy61Z-2BZWpZSeI1S7zWIxTx9oohJaXHDkQVt0-2BDGpiq5zDQHrMRHsSg-2F6J-2BgeVnJo33J2EnjbQQJ7F2nkPzuPYXIpYwQ-3D-3D&amp;source=gmail&amp;ust=1715108359711000&amp;usg=AOvVaw0wwnuN9yoZD3MHx2khrt7p;" target="_blank">
                                      Verify Login
                                    </a><br><br>
                                    </center>
                                  </td>
                              </tr>
                          </tbody></table>
                      </td>
                  </tr>
              </tbody></table>
              <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody><tr>
                      <td align="center" valign="top">
                          <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" style="width:80%">
                              <tbody><tr>
                                  <td class="m_1815589142183751782paragraph-block__content" style="padding:25px 0 18px 0;font-size:16px;line-height:27px;color:#969696;word-wrap:break-word;word-break:break-word" align="left">
                                      <p>
                                   
                                      </p>
                                  </td>
                              </tr>
                          </tbody></table>
                      </td>
                  </tr>
              </tbody></table>
              
              <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                  <tbody><tr>
                      <td align="center">
                          <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" width="620" align="center" style="border-bottom:solid 1px #eeeeee;width:620px">
                              <tbody><tr>
                                  <td align="center">&nbsp;</td>
                              </tr>
                          </tbody></table>
                      </td>
                  </tr>
              </tbody></table>
              
              <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                  <tbody><tr>
                      <td align="center">
                          <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" width="620" align="center" style="border-top:1px solid #eeeeee;width:620px">
                              <tbody><tr>
                                  <td style="text-align:center;padding:50px 0 10px 0">
                                      <a href="https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/Hx-XS2B0GaD4h8d8kOlQ8_9TmtVr-vmZ77whSaCjKTi5HvoP5h7sUf7wzhnWrxQERGKWvZocC4WpX64KyOPmWo4hGhjlWWP58GDm26PbYGxpdnZlkxovrpAIKLKy5l_waCQ00gI0OqpY4gajvN2CdO2S3b-TfQ298k1cf1bT3uXQ7I8u1ZvpIl1W9GiAxjOTQqlInlF7TdtF0m7HFUppueRJAI49NBDC4zfFj7Z8ZHQraR5GQoFTUKFM55zt9dMxR0PDEx21O4WnaPjVruX_LOgD0C5Y" style="font-size:28px;text-decoration:none;color:#d5d5d5" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/Hx-XS2B0GaD4h8d8kOlQ8_9TmtVr-vmZ77whSaCjKTi5HvoP5h7sUf7wzhnWrxQERGKWvZocC4WpX64KyOPmWo4hGhjlWWP58GDm26PbYGxpdnZlkxovrpAIKLKy5l_waCQ00gI0OqpY4gajvN2CdO2S3b-TfQ298k1cf1bT3uXQ7I8u1ZvpIl1W9GiAxjOTQqlInlF7TdtF0m7HFUppueRJAI49NBDC4zfFj7Z8ZHQraR5GQoFTUKFM55zt9dMxR0PDEx21O4WnaPjVruX_LOgD0C5Y&amp;source=gmail&amp;ust=1706165619211000&amp;usg=AOvVaw0YUGFgMDuo5QIAnIDopHVg">
                                        <img src="https://ci3.googleusercontent.com/meips/ADKq_NZvljZGwfiJJ4Is0wPQaMLfpFItZwbKCG1LyDlb0gcCpMVlHPXEHahVhJm-gYeIXV4hVppV7AxzZt0YZrm1CEJuh67KQw4D7tNooo-iGXqEYPG_idHrReGuDKXCH-5jNyZlXu96Temncv8GszgiEw-52_0gIHgp7dKjJR2FL-5lshj4VNJoFIGvarIV4Ck8UbEmHeqs2D0GB4JyB4qSyId744MHed6IfNB8IMrY6_or25pCofJ5_PKkccZVxHEQAku1NYjgDmAybioDgZ49vio87fcJlMdwDOKHO7YtLh5N72HpVYlKPptQIY8CsxsRw8xT7Vcm1fJQ2ljAojgZWCqigIow28Y1KcomDP7MPfdl25CsDb6V2vRW-Kqgh25-GfFx-nXmCBHNp2RcSIs2kan0-XdN4E0WvHyttD-0UNN-7dnttKRozKCy_lcLe2z7U-vj0lc_zHpC3YWzLR40KvZUlH8pOUeQzrjmA6SBGpOlui4O6QONZ_5qgYQGAWyGnu_lbRPVY0aIXakkeJrQ-DnC0FCFEhw33YduxoKGJD6Dkw5yHpFOrr8Tl7280Tajbd_4N8Y=s0-d-e1-ft#https://ehabhdi.r.bh.d.sendibt3.com/im/4701738/df92a2f7dd1019a5d035633c42cf101e1e87db1c84e3b7366fdc4b73916d5a3b.png?e=Fm8mZd3Vart9ug3efuiMqwTZDm7_4i2cOcDo4Ur7OwHVedxaLfagzQWP4A1nnpDcJvtlRxDkIoqpJagqVoObkFpACM3qYmJybbp3GtjcQ8Y6Zy5VeC4AKUy_r5yaiOatJmiYFIkZ1MVBy8TBGXrV47SoW52i3cPdCjDGVopGiVaUUL4X-BBqxtTz_4monQ-WQUAQ5Q2mfY6KYW3CGeNc0yLy7ZYQmOzIdcNXUplwghW6ld0DjX9TgsmGbBIi6tOMBdgnGTE19pZWMkIgYWEdDOrfmn6JXF4dJKlaAJA" border="0" class="CToWUd" data-bit="iit" width="50%" >
                                      </a>
                                  </td>
                              </tr>

                              <tr>
                                  <td style="color:#d5d5d5;text-align:center;font-size:15px;padding:10px 0 60px 0;line-height:22px">Copyright © <a href="https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/-fcoNLaBZPAt3XX4s8U4IJIbmDQ3z7ql2l0VOyeumzD1EZTF6Xb7cA1zjcd8TMN7MuXqmR6nVqm9LXfivr3FMNpF9dJ-U_w-wON_afJ4c31PJb4i2-Tj9jnVXcmNjw5iSco9j68-cX3-KWr43L-tD0hL73Nr5YWROD_INpilHLv8Pd1wS6IecY6wCyeuGrthaiM3mruwJCbqYtGt6VrU0lvNYZnk6Qg3QMSosqoKy0HwWhrscOf-veOk_JYaPFbkEptxmzknkMvQnCPwBasRRbi6vq5M" style="text-decoration:none;border-bottom:1px solid #d5d5d5;color:#d5d5d5" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/-fcoNLaBZPAt3XX4s8U4IJIbmDQ3z7ql2l0VOyeumzD1EZTF6Xb7cA1zjcd8TMN7MuXqmR6nVqm9LXfivr3FMNpF9dJ-U_w-wON_afJ4c31PJb4i2-Tj9jnVXcmNjw5iSco9j68-cX3-KWr43L-tD0hL73Nr5YWROD_INpilHLv8Pd1wS6IecY6wCyeuGrthaiM3mruwJCbqYtGt6VrU0lvNYZnk6Qg3QMSosqoKy0HwWhrscOf-veOk_JYaPFbkEptxmzknkMvQnCPwBasRRbi6vq5M&amp;source=gmail&amp;ust=1706165619211000&amp;usg=AOvVaw35wz2ukJzA36gvKp6pYzFD">TMC - The Motor Company</a>. <br>All rights reserved.</td>
                              </tr>
                          </tbody></table>
                      </td>
                  </tr>
              </tbody></table>
              
          </td>
      </tr>
  </tbody></table>`;
    await sendEmail("Verify your email in CMS", mail, email, "TMC");

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      super: process.env.SUPERUSER.split(",").indexOf(user.email) != -1
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      super: process.env.SUPERUSER.split(",").indexOf(user.email) != -1
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      super: process.env.SUPERUSER.split(",").indexOf(updatedUser.email) != -1
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const verifyCode = req.params.code
  await User.findOneAndUpdate({ verifyCode }, { $set: { verifyCode: "verified" }})

  res.redirect("https://aicms.tmcmotors.co.uk/login")
});

const resetPassword_send = asyncHandler(async (req, res) => {
  console.log(req.body.email)


  const resetCode = uuidv4();
  await User.findOneAndUpdate({ email: req.body.email }, {$set:{resetCode}})
  const mail = `<table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="width:100%">
    <tbody><tr>
        <td align="center" valign="top">
            
            <table class="m_1815589142183751782container m_1815589142183751782header" border="0" cellpadding="0" cellspacing="0" style="width:80%">
                <tbody><tr>
                    <td style="padding:30px 0 30px 0;border-bottom:solid 1px #eeeeee" align="center">
                        <a href="https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/WLnEavwrJY5Nj6_RB01h3jbZXPePNezwOGe5ScGAe9Ult66cNfyYiUZsUAu5v1mEeId6lTHWKbU_lELbZazZR_BTm6pmWUz5N5S1V5ri-Fsn7VC2k4th-sHHNllHzSqbtsVBEG3w0FhsFGl0IgJ9ecrd6O9cCFBTJjmaaT_A0_VmrswcCXPvTy9RbdReCYJ-CAl43u3zPQYNWl2HPxnHCrSMYkAw_9HhLIvq32df-Be6QGANlGrfV_gSzWT1jPSOLZxdao5cZ6jfUB9iVa0w9wYNWZOF" style="font-size:30px;text-decoration:none;color:#000000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/WLnEavwrJY5Nj6_RB01h3jbZXPePNezwOGe5ScGAe9Ult66cNfyYiUZsUAu5v1mEeId6lTHWKbU_lELbZazZR_BTm6pmWUz5N5S1V5ri-Fsn7VC2k4th-sHHNllHzSqbtsVBEG3w0FhsFGl0IgJ9ecrd6O9cCFBTJjmaaT_A0_VmrswcCXPvTy9RbdReCYJ-CAl43u3zPQYNWl2HPxnHCrSMYkAw_9HhLIvq32df-Be6QGANlGrfV_gSzWT1jPSOLZxdao5cZ6jfUB9iVa0w9wYNWZOF&amp;source=gmail&amp;ust=1706165619211000&amp;usg=AOvVaw3UPVcIKeGXw7AEMKvC9wTT">
                          <img src="https://ci3.googleusercontent.com/meips/ADKq_NZn_QSgPcx6eMkP8QAieJZJIFGfah4U5JYbXp1S83RdzOUrzAr1e4oTP1kv6MchuOiBuAvJAxAMNJDW324yTD83L2OnioV4oRipURoDMmyTgGE25MSKJAS_Y6bSr_WlPPTRE2feYD1BCajeXvvudgFYVO1E_kAc42AZ3cxByE-Oq7X48VLUfHaDNUHRF4Papycn6XbOD4Hp6IP6S4C-QtGUTObU7V4u-LfVXFsTk1Aw-JYruC-_U9xhXWVLKSECEYj_CwQfqwAI4NJG0JUdcVK08AiyWknjeQdAcONbc2MLjw1WoNfFZjP14_ySaWGBPawebC53998zy02QCDeyl6NeP--WunA4fICGfZzi_Q0YsXuPIvC5_SfJWN8TyOyZ9vH09yPSoB_5eSVHcQ8eZf7iLZlUC6BXT3Ri1bMikLaDV2-3Hhmx8tvS7USgmrTMuz1lt92_kSaZQz8ChJKRBxfsGU4JFeYlTBbRM-gfBdwOV7lGWZeHkUfcgcJ73_u88bRWwbVsoGNCtPAJs8Juw0dSMsOngWPHNgJl0Bvudt3PLLe3f6zxwBpAaJzTrkyHp6CUKDs=s0-d-e1-ft#https://ehabhdi.r.bh.d.sendibt3.com/im/4701738/df92a2f7dd1019a5d035633c42cf101e1e87db1c84e3b7366fdc4b73916d5a3b.png?e=XIFl1pArmA4X1MDpCVEStXqrk3sFdvIBSA8-7YOso_FxT8W8D9Bko6kaClkFyWe0DlnkkP9TZLo7PXkBD7SbxhvayepeUQWKfHgMVyvH8uMm01ESXsIElGBnmltWgiSHtZcpmDryw9P7XuF0FT1OD-tKrmL5tFZT4FBVTo18h6dNdv6J4mCwzHhOkJcmRU4JbbGVGVTOz_scNEbm0jp_3Oz34S3ALrOJHs0z3-CLtlKRme7tMOEkBwKjZ2XuOjPtWerIoWlTzc9j0GErqkarhMQTKrbd-sCQc50W5EA" border="0" class="CToWUd" data-bit="iit" width="50%" >
                        </a>
                    </td>
                </tr>
            </tbody></table>
            
            
            <table class="m_1815589142183751782container m_1815589142183751782title-block" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody><tr>
                    <td align="center" valign="top">
                        <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" style="width:80%">
                            <tbody><tr>
                                <td style="border-bottom:solid 1px #eeeeee;padding:0 0 18px 0;font-size:26px" align="left">
                                <center><br><a href="https://aicms.tmcmotors.co.uk/api/users/resetPassword/${resetCode}" style="text-decoration:none;line-height:100%;background:#5865f2;color:white;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;padding: 20px;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://click.discord.com/ls/click?upn%3Du001.a0NJ38DJJG1sulNx5wS1jjasHPOV5MgsCNLIOUybEqgv-2F76hJtte7st2YGE6B-2FX1y2Fxwqi-2B5q0bwfJfEpqNmODwZmejcnOydM4XV7IQLY7cfPiZLR8zPU1ghjEerKtjbcCkEi-2FP7u-2Bv3ZevfNz5sNI3xMuL052XB-2BqrRwHzsavtTpb7QjRIZHtB3scafI2Igsvh_Z8GnBSrkB34LMDrf9jG48l7A86fbxqUuqynm6oqlf2OzfFQpDUtuJ-2FY8FNbFifvA6KANI5gmeDGhiSwRa0Lmbb36SU-2BfVJBWqYAcB6azK5OKw52tgOzGI7c65-2Bnj41OePjT864SJFddYCfzWeaxBSlcr0QwLDvAmHOOGp32ldlT6j0ak4ma8NL-2F6CtAMy61Z-2BZWpZSeI1S7zWIxTx9oohJaXHDkQVt0-2BDGpiq5zDQHrMRHsSg-2F6J-2BgeVnJo33J2EnjbQQJ7F2nkPzuPYXIpYwQ-3D-3D&amp;source=gmail&amp;ust=1715108359711000&amp;usg=AOvVaw0wwnuN9yoZD3MHx2khrt7p;" target="_blank">
                                    Reset Password
                                  </a><br><br>
                                  </center>
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody><tr>
                    <td align="center" valign="top">
                        <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" style="width:80%">
                            <tbody><tr>
                                <td class="m_1815589142183751782paragraph-block__content" style="padding:25px 0 18px 0;font-size:16px;line-height:27px;color:#969696;word-wrap:break-word;word-break:break-word" align="left">
                                    <p>
                                
                                    </p>
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            
            <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                <tbody><tr>
                    <td align="center">
                        <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" width="620" align="center" style="border-bottom:solid 1px #eeeeee;width:620px">
                            <tbody><tr>
                                <td align="center">&nbsp;</td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            
            <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                <tbody><tr>
                    <td align="center">
                        <table class="m_1815589142183751782container" border="0" cellpadding="0" cellspacing="0" width="620" align="center" style="border-top:1px solid #eeeeee;width:620px">
                            <tbody><tr>
                                <td style="text-align:center;padding:50px 0 10px 0">
                                    <a href="https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/Hx-XS2B0GaD4h8d8kOlQ8_9TmtVr-vmZ77whSaCjKTi5HvoP5h7sUf7wzhnWrxQERGKWvZocC4WpX64KyOPmWo4hGhjlWWP58GDm26PbYGxpdnZlkxovrpAIKLKy5l_waCQ00gI0OqpY4gajvN2CdO2S3b-TfQ298k1cf1bT3uXQ7I8u1ZvpIl1W9GiAxjOTQqlInlF7TdtF0m7HFUppueRJAI49NBDC4zfFj7Z8ZHQraR5GQoFTUKFM55zt9dMxR0PDEx21O4WnaPjVruX_LOgD0C5Y" style="font-size:28px;text-decoration:none;color:#d5d5d5" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/Hx-XS2B0GaD4h8d8kOlQ8_9TmtVr-vmZ77whSaCjKTi5HvoP5h7sUf7wzhnWrxQERGKWvZocC4WpX64KyOPmWo4hGhjlWWP58GDm26PbYGxpdnZlkxovrpAIKLKy5l_waCQ00gI0OqpY4gajvN2CdO2S3b-TfQ298k1cf1bT3uXQ7I8u1ZvpIl1W9GiAxjOTQqlInlF7TdtF0m7HFUppueRJAI49NBDC4zfFj7Z8ZHQraR5GQoFTUKFM55zt9dMxR0PDEx21O4WnaPjVruX_LOgD0C5Y&amp;source=gmail&amp;ust=1706165619211000&amp;usg=AOvVaw0YUGFgMDuo5QIAnIDopHVg">
                                      <img src="https://ci3.googleusercontent.com/meips/ADKq_NZvljZGwfiJJ4Is0wPQaMLfpFItZwbKCG1LyDlb0gcCpMVlHPXEHahVhJm-gYeIXV4hVppV7AxzZt0YZrm1CEJuh67KQw4D7tNooo-iGXqEYPG_idHrReGuDKXCH-5jNyZlXu96Temncv8GszgiEw-52_0gIHgp7dKjJR2FL-5lshj4VNJoFIGvarIV4Ck8UbEmHeqs2D0GB4JyB4qSyId744MHed6IfNB8IMrY6_or25pCofJ5_PKkccZVxHEQAku1NYjgDmAybioDgZ49vio87fcJlMdwDOKHO7YtLh5N72HpVYlKPptQIY8CsxsRw8xT7Vcm1fJQ2ljAojgZWCqigIow28Y1KcomDP7MPfdl25CsDb6V2vRW-Kqgh25-GfFx-nXmCBHNp2RcSIs2kan0-XdN4E0WvHyttD-0UNN-7dnttKRozKCy_lcLe2z7U-vj0lc_zHpC3YWzLR40KvZUlH8pOUeQzrjmA6SBGpOlui4O6QONZ_5qgYQGAWyGnu_lbRPVY0aIXakkeJrQ-DnC0FCFEhw33YduxoKGJD6Dkw5yHpFOrr8Tl7280Tajbd_4N8Y=s0-d-e1-ft#https://ehabhdi.r.bh.d.sendibt3.com/im/4701738/df92a2f7dd1019a5d035633c42cf101e1e87db1c84e3b7366fdc4b73916d5a3b.png?e=Fm8mZd3Vart9ug3efuiMqwTZDm7_4i2cOcDo4Ur7OwHVedxaLfagzQWP4A1nnpDcJvtlRxDkIoqpJagqVoObkFpACM3qYmJybbp3GtjcQ8Y6Zy5VeC4AKUy_r5yaiOatJmiYFIkZ1MVBy8TBGXrV47SoW52i3cPdCjDGVopGiVaUUL4X-BBqxtTz_4monQ-WQUAQ5Q2mfY6KYW3CGeNc0yLy7ZYQmOzIdcNXUplwghW6ld0DjX9TgsmGbBIi6tOMBdgnGTE19pZWMkIgYWEdDOrfmn6JXF4dJKlaAJA" border="0" class="CToWUd" data-bit="iit" width="50%" >
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td style="color:#d5d5d5;text-align:center;font-size:15px;padding:10px 0 60px 0;line-height:22px">Copyright © <a href="https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/-fcoNLaBZPAt3XX4s8U4IJIbmDQ3z7ql2l0VOyeumzD1EZTF6Xb7cA1zjcd8TMN7MuXqmR6nVqm9LXfivr3FMNpF9dJ-U_w-wON_afJ4c31PJb4i2-Tj9jnVXcmNjw5iSco9j68-cX3-KWr43L-tD0hL73Nr5YWROD_INpilHLv8Pd1wS6IecY6wCyeuGrthaiM3mruwJCbqYtGt6VrU0lvNYZnk6Qg3QMSosqoKy0HwWhrscOf-veOk_JYaPFbkEptxmzknkMvQnCPwBasRRbi6vq5M" style="text-decoration:none;border-bottom:1px solid #d5d5d5;color:#d5d5d5" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://ehabhdi.r.bh.d.sendibt3.com/tr/cl/-fcoNLaBZPAt3XX4s8U4IJIbmDQ3z7ql2l0VOyeumzD1EZTF6Xb7cA1zjcd8TMN7MuXqmR6nVqm9LXfivr3FMNpF9dJ-U_w-wON_afJ4c31PJb4i2-Tj9jnVXcmNjw5iSco9j68-cX3-KWr43L-tD0hL73Nr5YWROD_INpilHLv8Pd1wS6IecY6wCyeuGrthaiM3mruwJCbqYtGt6VrU0lvNYZnk6Qg3QMSosqoKy0HwWhrscOf-veOk_JYaPFbkEptxmzknkMvQnCPwBasRRbi6vq5M&amp;source=gmail&amp;ust=1706165619211000&amp;usg=AOvVaw35wz2ukJzA36gvKp6pYzFD">TMC - The Motor Company</a>. <br>All rights reserved.</td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            
        </td>
    </tr>
  </tbody></table>`;
  await sendEmail("Reset Password in CMS", mail, req.body.email, "TMC");

  res.json({ message: `Check your email inbox of ${req.body.email}. Password will be reset to 1234567890.`})
});

const resetPassword = asyncHandler(async (req, res) => {
  const resetCode = req.params.code
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash("1234567890", salt);
  await User.findOneAndUpdate({ resetCode }, { $set: { password }})

  res.redirect("https://aicms.tmcmotors.co.uk/login")
});
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  verifyUser,
  resetPassword_send,
  resetPassword
};
