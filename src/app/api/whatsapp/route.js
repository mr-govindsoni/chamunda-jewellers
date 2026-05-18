import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request) {
  try {
    const data = await request.json();
    const { type, name, email, phone } = data;

    let message = '';
    if (type === 'signup') {
      message = `🆕 *New Customer Registration*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'Not provided'}`;
    } else if (type === 'login') {
      message = `🔑 *Customer Login Alert*\n\n*Name:* ${name}\n*Email:* ${email}`;
    } else if (type === 'enquiry') {
      message = `💬 *New Enquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}`;
    }

    // Console logging for verification
    console.log("-----------------------------------------");
    console.log("WHATSAPP NOTIFICATION TRIGGERED:");
    console.log(message);
    console.log("-----------------------------------------");

    // TWILIO WHATSAPP INTEGRATION
    // Admin WhatsApp Number specified: +918764274110 (assumed country code +91 for India, please configure if different)
    const adminWhatsAppNumber = 'whatsapp:+918764274110';
    
    // Twilio Credentials (These should be stored in .env.local)
    // process.env.TWILIO_ACCOUNT_SID
    // process.env.TWILIO_AUTH_TOKEN
    // process.env.TWILIO_WHATSAPP_NUMBER (e.g., 'whatsapp:+14155238886' - Twilio Sandbox number)
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID || 'dummy_sid_for_build'; 
    const authToken = process.env.TWILIO_AUTH_TOKEN || 'dummy_token_for_build';
    const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // default sandbox number

    // We only attempt to actually send if the keys appear valid (not dummy), 
    // otherwise we just return success based on the mock log above to avoid crashing.
    if (accountSid !== 'dummy_sid_for_build') {
      const client = twilio(accountSid, authToken);
      
      const twilioResponse = await client.messages.create({
        body: message,
        from: twilioWhatsAppNumber,
        to: adminWhatsAppNumber
      });
      console.log(`Twilio Message Sent SID: ${twilioResponse.sid}`);
    } else {
      console.log("Twilio credentials not configured in .env.local. Simulated send successful.");
    }

    return NextResponse.json({ success: true, message: 'Notification processed' });
  } catch (error) {
    console.error('WhatsApp API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send notification' }, { status: 500 });
  }
}

