import { google } from 'googleapis';

export async function GET() {
  try {
    // ✅ Hardcoded credentials
    const GOOGLE_SHEETS_ID = '1qH9vj2J6UT0d55_1dM1YQJJQfBsDTv4LbXQV-gkjbno';

    const credentials = {
      type: 'service_account',
      project_id: 'metal-cable-451403-d1',
      private_key_id: '30d1eba9cb2dee5d9dd4de5c81e5e46b1c39a5f1',
      private_key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCVvJPuofQAazzO
4EJoAy3GvEjB2ap2PVpCWzI0DZCVeHnluln6t3kZ17ro4WsDB7ya4D3OnuJce416
/X1E7sTjPVe0y4dPbvetJt/XhvrGYyBt6FJve40W+RveSEn9g+TSiwGm58U+jIon
/ToZrOCK3mVPUDuiDIurCmUsfq99bEofRf5ctrrkAdgLCU3qxN8+qMeMB3ch8z4N
S8SKmugFpiGBojBt0TZ813V/J7EzVJ+NUO9Dw+owv8kwOlcsujw37qxkxJr+6pIz
Rm2oFb/k/hPcY6j8d4C+VizxxJ+VhsO1YWvo6rhxNmawLy4xDWxzvv7tV38BJRox
2/3P/AkTAgMBAAECggEAG2yNX4BT8xuw6GbUYr5qTOLBJJfcC4nTFSIkwLnXSDjn
gnat8ihWSrBjMDHQ6p4pIeh+CXC6HpwWXnc80To13zSl8pvwLVEylYjwKEY1ec4/
60FIj9h+D74SJ5Tv0Dmu2AzTgaEjVABjcU2ErZ0nBugSgAM+2MAZeHsP6qVNONgr
uwxPBVp9xtEdVC0zmGa4s1+j56qCkDOxKWM6OUuohJjeJ84j9VlNTMZ6tun0pvgv
wkqIyvjvydckKWvCh6UAilhx5wOZNtXbYs3B/giUgtzzy1cUsHYtxuZgy7mD/qYS
Ttx/sgn4vyHRsp88gGQ1sge4PRrDapDUNiKVazmg4QKBgQDLJWct047bHqA7QSSV
Dr5zrhXUdk6M0qI+n0gxsuHOzoSoq5SbPPbJeZAXZukfzx8mElqZMmVHXQtu3ypB
4iyD/xVJ3fE2MpMgJ0e2lVLGhHzCxKjucO4uTgr/52o/n09rQpGRNKPpEdgpaL0U
PI7fhh2fATWemOt2Ue1eW1uXowKBgQC8sdLTqCffD4UOde9kFtHSuev3eM2pm1hk
DbWxKPFNQA8Xsa64is8mm4Bd6mrlkxzTPVxYo0JL1bX5QyMmxYT+Fc68piVaNdQP
bvQu9mIXOgp2j0v+OoOfUwy2dF4tXkYrXM44tOGBsZjJ0jp5rt1UjZ/KarbHD/xp
haeyCU2f0QKBgQChKqlzJ/acTO3eVM5LG4lpiWF0T+/9tVZWzFOgakTPp/SDRKz/
hBxet3zjtBebztztfX43ME49kcnySkbiQigDCKrBEb2+u90Rk1hHuKwVJyM7+n3z
vdCZF/2ODPC0TRXbCNMoGlU4IZoXMCtiFLFdELALaBA8JSIZmuHxDBXcdQKBgFer
QunF2eiAPHCwiK33EDuY2DJddShVHac223DZNeuPVLPMgQIKtB4a53Q7ArlxNVZL
zwj7qUS0oVyTPdS4toaauTfa9cXI9qLJCTh8jqx98fiNsWAH7blri5+Fx2/Kuk1R
TBr6pz9rtTIns7VvcjPjrRcNp6grHDomt/g27FLRAoGBAMRlTAd3hUem6o7BUIDX
7hw/M18tGoeBK0/8/tdsPeXjYQUoL/mjt785QOvZFma+fUfmRqVowvMjjEKGlry2
/KZDITAvXoczA+oLLvV7A2VFOXiu8rBCUrNUdWsSh/qbSntiUaZfol13znhNiQDZ
FV3nkyOCZl4OEzBnXMdmSjJV
-----END PRIVATE KEY-----`,
      client_email: 'diversion@metal-cable-451403-d1.iam.gserviceaccount.com',
      client_id: '113255049061817495891',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/diversion%40metal-cable-451403-d1.iam.gserviceaccount.com',
    };

    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Sheet1!A3:E50',
    });
    
    console.log(response.data.values);
    return new Response(JSON.stringify(response.data.values), { status: 200 });
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
}
