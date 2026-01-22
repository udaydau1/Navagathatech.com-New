# DNS Records Setup for navagathatech.com

## Records to Add to Your Domain Registrar

Based on your Resend dashboard, you need to add these DNS records:

### 1. DKIM Record (Domain Verification)
```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
TTL: Auto (or 3600)
```

### 2. SPF Record (Enable Sending) - MX Record
```
Type: MX
Name: send
Value: feedback-smtp.ap-northeast-1.amazonaws.com
Priority: 10
TTL: Auto (or 3600)
```

### 3. SPF Record (Enable Sending) - TXT Record
```
Type: TXT
Name: send
Value: v=spf1 include:amazonses.com ~all
TTL: Auto (or 3600)
```

## Where to Add These Records

### If your domain is with:

#### **GoDaddy**
1. Log in to GoDaddy
2. Go to **My Products** → **DNS**
3. Click **Add** for each record
4. Enter the Type, Name, and Value
5. Save

#### **Namecheap**
1. Log in to Namecheap
2. Go to **Domain List** → Click **Manage**
3. Go to **Advanced DNS** tab
4. Click **Add New Record**
5. Enter details for each record
6. Save

#### **Cloudflare**
1. Log in to Cloudflare
2. Select your domain
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Enter details for each record
6. Turn OFF the proxy (gray cloud) for these records
7. Save

#### **Other Registrars**
Look for "DNS Management", "DNS Settings", or "Advanced DNS" in your domain control panel.

## Important Notes

1. **Name/Host Field**:
   - Some registrars want just the subdomain (e.g., `resend._domainkey`)
   - Others want the full domain (e.g., `resend._domainkey.navagathatech.com`)
   - If unsure, try the short version first

2. **MX Record Priority**: Set to `10`

3. **TTL**: Use "Auto" or `3600` (1 hour)

4. **Propagation Time**: DNS changes can take 5-30 minutes to propagate

## After Adding Records

1. Wait 5-10 minutes
2. Go back to Resend dashboard
3. Click **"I've added the records"** button
4. Resend will verify automatically
5. You'll see a green checkmark when verified

## Verification Status

Once verified, you'll be able to:
- ✅ Send emails from `noreply@navagathatech.com`
- ✅ Send emails to `info@navagathatech.com`
- ✅ Send to any email address
- ✅ Better email deliverability

## Need Help?

If you're not sure where your domain is registered, you can check:
- Look at your domain purchase receipt/email
- Use WHOIS lookup: https://who.is/whois/navagathatech.com
- Check your email for domain renewal notices

Let me know which registrar you're using and I can provide more specific instructions!
