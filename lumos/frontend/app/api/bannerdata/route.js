import axios from "axios";

export async function GET(req, res){
    const response = await axios.get("https://query1.finance.yahoo.com/v8/finance/chart/^NSEI");
    return new Response(JSON.stringify(response.data));
}