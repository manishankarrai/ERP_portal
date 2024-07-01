const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = crypto.createHash('sha256').update('worldIsBeautyful').digest();  

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (hash) => {
    const [ivHex, encryptedText] = hash.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
    return decrypted.toString();
};

function generateSEOTitle(subcategory_name) {
    const seoTitle = subcategory_name.toLowerCase().replace(/\s+/g, '-');
    const cleanedTitle = seoTitle.replace(/[^a-z0-9-]/g, '');
    return cleanedTitle;
}

module.exports = { generateSEOTitle, encrypt, decrypt };
