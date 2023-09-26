<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Welcome Email</title>
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
</head>

<body style="margin:0; padding:0;background:#fff;">
  <div
    style="font-family: Helvetica Neue, Roboto, Helvetica, Helvetica, Arial, sans-serif;font-size:12px; height:100%;">
    <table style="width:100%;">
      <tr>
        <td>
          <div
            style="padding:15px; max-width:750px; margin:0 auto; border: solid 2px #d8dada; display:block; border-radius:0px; padding:0px;">
            <!-- ================= mail_header ================== -->
            <table style="width:100%; height: 80px; border-bottom:1px solid #d8dada; margin-top:0;background:#fff;">
              <tr>
                <td>
                  <div>
                    <table width="100%">
                      <tr>
                        <td style="text-align:left; font-size: 20px; font-weight: 700; padding:10px 10px 10px 50px">
                          <img src="{{ asset('img/amplofly-logo.png') }}" alt="">
                        </td>
                        <td style="text-align:right;color: #708393;font-size: 12px; padding:10px 50px 10px 10px">
                          <div style="display: flex;float: right;align-items: center;"><span
                              style="display: inline-block"><img src="{{ asset('img/diva-icon.png') }}" alt=""></span> <i
                              style="display: inline-block">Powered by {{ env('APP_NAME') }}</i></div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
            </table>
            <!-- ================= End_mail_header ============== -->

            <!-- ================= mail_body ==================== -->
            <div style="margin:0;  padding:0 90px; display:block;background:#f9fafb;border:0px #f1f1f1 solid;">
              <table style="padding:10px 0 0 0px; font-size:15px; width:100%;">
                <tr>
                  <td style="width:100%;">
                    <p style="font-size: 37.5px; font-weight: 700;color: #212529;margin-bottom: 22px;">Welcome</p>
                    <p style="font-size: 13px; margin-top:10px;margin-bottom:0px; color:#212529;">
                      Hi {{ $first_name.' '.$last_name }},
                    </p>
                    <p style="font-size:13px;margin-top:0px; line-height:20px; color:#212529;">
                      {{ $name }}, has invited you to collaborate on an AmploFly 4.0 Strategic Assessment for {{ $organisation }}. The
                      link
                      below will allow you to set up your account on the Amplo Customer Portal.
                    </p>

                    <p><a href="{{ $link }}" style="padding: 12px 0px;
                        font-size: 13px;
                        text-decoration: none;
                        display: block;
                        background: #083ac8;
                        color: #fff;
                        border: 0px #37393e solid;
                        border-radius: 4px;
                        text-align: center;
                        width: 100%;
                        font-weight: 700; margin-bottom: 40px;">SET UP ACCOUNT</a></p>
                    <p style="font-size:13px;margin-top:0px; line-height:20px; color:#212529;">Thanks,<br>
                      Amplo Global Team
                    </p>
                    <p style="font-size:13px;margin-top:0px; line-height:20px; color:#212529;">
                      <strong style="font-size: 20px; font-weight: bold; letter-spacing: -0.05px; color: #212529;">
                        Button not working?</strong><br>
                      Click on the link below, or copy and paste it into the address bar of your web browser:
                    </p>
                    <p style="font-size:13px;margin-top:0px;letter-spacing: -.5px; line-height:20px; color:#212529;">
                      <a href="{{ $link }}"
                        style="color: #083ac8;">{{ $link }}</a><br><br>

                      Questions? We're here to help. Contact <a href="#"
                      style="color: #083ac8;">customercare.amploglobal.com</a></p>

                  </td>
                </tr>
              </table>
            </div>
            <!-- ================= End_mail_body ================ -->

            <!-- ================= mail_footer ================== -->
            <table width="100%" style="height: 148px;background-color: #000000; margin-top: 40px;">
              <tr>
                <td>
                  <div style="width:100%;float:left; margin: 0 60px; font-size:14px;text-align:left; color:#fff;">
                    <p style="color:#fff;font-size: 18px;font-weight: bold;"> <img src="{{ asset('img/amplofly-logo.png') }}" alt=""></p>
                    <p style="color:#fff; font-size: 12px;">© {{ date('Y') }} {{ env('APP_NAME') }}. All rights reserved.</p>
                    <p style="color:#fff;font-size: 11px; margin-top: 15px;"><a href="#"
                        style="color: #fff; text-decoration: none;">TERMS OF SERVICE</a> | <a href="#"
                        style="color: #fff; text-decoration: none;">PRIVACY POLICY</a></p>
                  </div>
                </td>
              </tr>
            </table>
            <!-- ================= End_mail_footer ============= -->
          </div>
        </td>
      </tr>
    </table>
  </div>

  </div>
  </td>
  </tr>
  </table>
  </div>
</body>

</html>