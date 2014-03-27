;(function(root,factory){var Salsa20,crypto
if(typeof define==='function'&&define.amd){define(['salsa20'],factory.bind(root,root.crypto))}else if(typeof module!=='undefined'&&module.exports){Salsa20=require('./salsa20.js')
crypto=require('crypto')
module.exports=factory(crypto,Salsa20)}else{root.BigInt=factory(root.crypto,root.Salsa20)}}(this,function(crypto,Salsa20){var bpe=0
var mask=0;var radix=mask+1;var digitsStr='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\\'\"+-';for(bpe=0;(1<<(bpe+1))>(1<<bpe);bpe++);bpe>>=1;mask=(1<<bpe)-1;radix=mask+1;var one=int2bigInt(1,1,1);var t=new Array(0);var ss=t;var s0=t;var s1=t;var s2=t;var s3=t;var s4=t,s5=t;var s6=t;var s7=t;var T=t;var sa=t;var mr_x1=t,mr_r=t,mr_a=t;var eg_v=t,eg_u=t,eg_A=t,eg_B=t,eg_C=t,eg_D=t;var md_q1=t,md_q2=t,md_q3=t,md_r=t,md_r1=t,md_r2=t,md_tt=t;var primes=t,pows=t,s_i=t,s_i2=t,s_R=t,s_rm=t,s_q=t,s_n1=t;var s_a=t,s_r2=t,s_n=t,s_b=t,s_d=t,s_x1=t,s_x2=t,s_aa=t;var rpprb=t;function findPrimes(n){var i,s,p,ans;s=new Array(n);for(i=0;i<n;i++)
s[i]=0;s[0]=2;p=0;for(;s[p]<n;){for(i=s[p]*s[p];i<n;i+=s[p])
s[i]=1;p++;s[p]=s[p-1]+1;for(;s[p]<n&&s[s[p]];s[p]++);}
ans=new Array(p);for(i=0;i<p;i++)
ans[i]=s[i];return ans;}
function millerRabinInt(x,b){if(mr_x1.length!=x.length){mr_x1=dup(x);mr_r=dup(x);mr_a=dup(x);}
copyInt_(mr_a,b);return millerRabin(x,mr_a);}
function millerRabin(x,b){var i,j,k,s;if(mr_x1.length!=x.length){mr_x1=dup(x);mr_r=dup(x);mr_a=dup(x);}
copy_(mr_a,b);copy_(mr_r,x);copy_(mr_x1,x);addInt_(mr_r,-1);addInt_(mr_x1,-1);if(isZero(mr_r))return 0;for(k=0;mr_r[k]==0;k++);for(i=1,j=2;mr_r[k]%j==0;j*=2,i++);s=k*bpe+i-1;if(s)
rightShift_(mr_r,s);powMod_(mr_a,mr_r,x);if(!equalsInt(mr_a,1)&&!equals(mr_a,mr_x1)){j=1;while(j<=s-1&&!equals(mr_a,mr_x1)){squareMod_(mr_a,x);if(equalsInt(mr_a,1)){return 0;}
j++;}
if(!equals(mr_a,mr_x1)){return 0;}}
return 1;}
function bitSize(x){var j,z,w;for(j=x.length-1;(x[j]==0)&&(j>0);j--);for(z=0,w=x[j];w;(w>>=1),z++);z+=bpe*j;return z;}
function expand(x,n){var ans=int2bigInt(0,(x.length>n?x.length:n)*bpe,0);copy_(ans,x);return ans;}
function randTruePrime(k){var ans=int2bigInt(0,k,0);randTruePrime_(ans,k);return trim(ans,1);}
function randProbPrime(k){if(k>=600)return randProbPrimeRounds(k,2);if(k>=550)return randProbPrimeRounds(k,4);if(k>=500)return randProbPrimeRounds(k,5);if(k>=400)return randProbPrimeRounds(k,6);if(k>=350)return randProbPrimeRounds(k,7);if(k>=300)return randProbPrimeRounds(k,9);if(k>=250)return randProbPrimeRounds(k,12);if(k>=200)return randProbPrimeRounds(k,15);if(k>=150)return randProbPrimeRounds(k,18);if(k>=100)return randProbPrimeRounds(k,27);return randProbPrimeRounds(k,40);}
function randProbPrimeRounds(k,n){var ans,i,divisible,B;B=30000;ans=int2bigInt(0,k,0);if(primes.length==0)
primes=findPrimes(30000);if(rpprb.length!=ans.length)
rpprb=dup(ans);for(;;){randBigInt_(ans,k,0);ans[0]|=1;divisible=0;for(i=0;(i<primes.length)&&(primes[i]<=B);i++)
if(modInt(ans,primes[i])==0&&!equalsInt(ans,primes[i])){divisible=1;break;}
for(i=0;i<n&&!divisible;i++){randBigInt_(rpprb,k,0);while(!greater(ans,rpprb))
randBigInt_(rpprb,k,0);if(!millerRabin(ans,rpprb))
divisible=1;}
if(!divisible)
return ans;}}
function mod(x,n){var ans=dup(x);mod_(ans,n);return trim(ans,1);}
function addInt(x,n){var ans=expand(x,x.length+1);addInt_(ans,n);return trim(ans,1);}
function mult(x,y){var ans=expand(x,x.length+y.length);mult_(ans,y);return trim(ans,1);}
function powMod(x,y,n){var ans=expand(x,n.length);powMod_(ans,trim(y,2),trim(n,2),0);return trim(ans,1);}
function sub(x,y){var ans=expand(x,(x.length>y.length?x.length+1:y.length+1));sub_(ans,y);return trim(ans,1);}
function add(x,y){var ans=expand(x,(x.length>y.length?x.length+1:y.length+1));add_(ans,y);return trim(ans,1);}
function inverseMod(x,n){var ans=expand(x,n.length);var s;s=inverseMod_(ans,n);return s?trim(ans,1):null;}
function multMod(x,y,n){var ans=expand(x,n.length);multMod_(ans,y,n);return trim(ans,1);}
function randTruePrime_(ans,k){var c,w,m,pm,dd,j,r,B,divisible,z,zz,recSize,recLimit;if(primes.length==0)
primes=findPrimes(30000);if(pows.length==0){pows=new Array(512);for(j=0;j<512;j++){pows[j]=Math.pow(2,j/511.0-1.0);}}
c=0.1;m=20;recLimit=20;if(s_i2.length!=ans.length){s_i2=dup(ans);s_R=dup(ans);s_n1=dup(ans);s_r2=dup(ans);s_d=dup(ans);s_x1=dup(ans);s_x2=dup(ans);s_b=dup(ans);s_n=dup(ans);s_i=dup(ans);s_rm=dup(ans);s_q=dup(ans);s_a=dup(ans);s_aa=dup(ans);}
if(k<=recLimit){pm=(1<<((k+2)>>1))-1;copyInt_(ans,0);for(dd=1;dd;){dd=0;ans[0]=1|(1<<(k-1))|randomBitInt(k);for(j=1;(j<primes.length)&&((primes[j]&pm)==primes[j]);j++){if(0==(ans[0]%primes[j])){dd=1;break;}}}
carry_(ans);return;}
B=c*k*k;if(k>2*m)
for(r=1;k-k*r<=m;)
r=pows[randomBitInt(9)];else
r=0.5;recSize=Math.floor(r*k)+1;randTruePrime_(s_q,recSize);copyInt_(s_i2,0);s_i2[Math.floor((k-2)/bpe)]|=(1<<((k-2)%bpe));divide_(s_i2,s_q,s_i,s_rm);z=bitSize(s_i);for(;;){for(;;){randBigInt_(s_R,z,0);if(greater(s_i,s_R))
break;}
addInt_(s_R,1);add_(s_R,s_i);copy_(s_n,s_q);mult_(s_n,s_R);multInt_(s_n,2);addInt_(s_n,1);copy_(s_r2,s_R);multInt_(s_r2,2);for(divisible=0,j=0;(j<primes.length)&&(primes[j]<B);j++)
if(modInt(s_n,primes[j])==0&&!equalsInt(s_n,primes[j])){divisible=1;break;}
if(!divisible)
if(!millerRabinInt(s_n,2))
divisible=1;if(!divisible){addInt_(s_n,-3);for(j=s_n.length-1;(s_n[j]==0)&&(j>0);j--);for(zz=0,w=s_n[j];w;(w>>=1),zz++);zz+=bpe*j;for(;;){randBigInt_(s_a,zz,0);if(greater(s_n,s_a))
break;}
addInt_(s_n,3);addInt_(s_a,2);copy_(s_b,s_a);copy_(s_n1,s_n);addInt_(s_n1,-1);powMod_(s_b,s_n1,s_n);addInt_(s_b,-1);if(isZero(s_b)){copy_(s_b,s_a);powMod_(s_b,s_r2,s_n);addInt_(s_b,-1);copy_(s_aa,s_n);copy_(s_d,s_b);GCD_(s_d,s_n);if(equalsInt(s_d,1)){copy_(ans,s_aa);return;}}}}}
function randBigInt(n,s){var a,b;a=Math.floor((n-1)/bpe)+2;b=int2bigInt(0,0,a);randBigInt_(b,n,s);return b;}
function randBigInt_(b,n,s){var i,a;for(i=0;i<b.length;i++)
b[i]=0;a=Math.floor((n-1)/bpe)+1;for(i=0;i<a;i++){b[i]=randomBitInt(bpe);}
b[a-1]&=(2<<((n-1)%bpe))-1;if(s==1)
b[a-1]|=(1<<((n-1)%bpe));}
function GCD(x,y){var xc,yc;xc=dup(x);yc=dup(y);GCD_(xc,yc);return xc;}
function GCD_(x,y){var i,xp,yp,A,B,C,D,q,sing,qp;if(T.length!=x.length)
T=dup(x);sing=1;while(sing){sing=0;for(i=1;i<y.length;i++)
if(y[i]){sing=1;break;}
if(!sing)break;for(i=x.length;!x[i]&&i>=0;i--);xp=x[i];yp=y[i];A=1;B=0;C=0;D=1;while((yp+C)&&(yp+D)){q=Math.floor((xp+A)/(yp+C));qp=Math.floor((xp+B)/(yp+D));if(q!=qp)
break;t=A-q*C;A=C;C=t;t=B-q*D;B=D;D=t;t=xp-q*yp;xp=yp;yp=t;}
if(B){copy_(T,x);linComb_(x,y,A,B);linComb_(y,T,D,C);}else{mod_(x,y);copy_(T,x);copy_(x,y);copy_(y,T);}}
if(y[0]==0)
return;t=modInt(x,y[0]);copyInt_(x,y[0]);y[0]=t;while(y[0]){x[0]%=y[0];t=x[0];x[0]=y[0];y[0]=t;}}
function inverseMod_(x,n){var k=1+2*Math.max(x.length,n.length);if(!(x[0]&1)&&!(n[0]&1)){copyInt_(x,0);return 0;}
if(eg_u.length!=k){eg_u=new Array(k);eg_v=new Array(k);eg_A=new Array(k);eg_B=new Array(k);eg_C=new Array(k);eg_D=new Array(k);}
copy_(eg_u,x);copy_(eg_v,n);copyInt_(eg_A,1);copyInt_(eg_B,0);copyInt_(eg_C,0);copyInt_(eg_D,1);for(;;){while(!(eg_u[0]&1)){halve_(eg_u);if(!(eg_A[0]&1)&&!(eg_B[0]&1)){halve_(eg_A);halve_(eg_B);}else{add_(eg_A,n);halve_(eg_A);sub_(eg_B,x);halve_(eg_B);}}
while(!(eg_v[0]&1)){halve_(eg_v);if(!(eg_C[0]&1)&&!(eg_D[0]&1)){halve_(eg_C);halve_(eg_D);}else{add_(eg_C,n);halve_(eg_C);sub_(eg_D,x);halve_(eg_D);}}
if(!greater(eg_v,eg_u)){sub_(eg_u,eg_v);sub_(eg_A,eg_C);sub_(eg_B,eg_D);}else{sub_(eg_v,eg_u);sub_(eg_C,eg_A);sub_(eg_D,eg_B);}
if(equalsInt(eg_u,0)){while(negative(eg_C))
add_(eg_C,n);copy_(x,eg_C);if(!equalsInt(eg_v,1)){copyInt_(x,0);return 0;}
return 1;}}}
function inverseModInt(x,n){var a=1,b=0,t;for(;;){if(x==1)return a;if(x==0)return 0;b-=a*Math.floor(n/x);n%=x;if(n==1)return b;if(n==0)return 0;a-=b*Math.floor(x/n);x%=n;}}
function inverseModInt_(x,n){return inverseModInt(x,n);}
function eGCD_(x,y,v,a,b){var g=0;var k=Math.max(x.length,y.length);if(eg_u.length!=k){eg_u=new Array(k);eg_A=new Array(k);eg_B=new Array(k);eg_C=new Array(k);eg_D=new Array(k);}
while(!(x[0]&1)&&!(y[0]&1)){halve_(x);halve_(y);g++;}
copy_(eg_u,x);copy_(v,y);copyInt_(eg_A,1);copyInt_(eg_B,0);copyInt_(eg_C,0);copyInt_(eg_D,1);for(;;){while(!(eg_u[0]&1)){halve_(eg_u);if(!(eg_A[0]&1)&&!(eg_B[0]&1)){halve_(eg_A);halve_(eg_B);}else{add_(eg_A,y);halve_(eg_A);sub_(eg_B,x);halve_(eg_B);}}
while(!(v[0]&1)){halve_(v);if(!(eg_C[0]&1)&&!(eg_D[0]&1)){halve_(eg_C);halve_(eg_D);}else{add_(eg_C,y);halve_(eg_C);sub_(eg_D,x);halve_(eg_D);}}
if(!greater(v,eg_u)){sub_(eg_u,v);sub_(eg_A,eg_C);sub_(eg_B,eg_D);}else{sub_(v,eg_u);sub_(eg_C,eg_A);sub_(eg_D,eg_B);}
if(equalsInt(eg_u,0)){while(negative(eg_C)){add_(eg_C,y);sub_(eg_D,x);}
multInt_(eg_D,-1);copy_(a,eg_C);copy_(b,eg_D);leftShift_(v,g);return;}}}
function negative(x){return((x[x.length-1]>>(bpe-1))&1);}
function greaterShift(x,y,shift){var i,kx=x.length,ky=y.length;var k=((kx+shift)<ky)?(kx+shift):ky;for(i=ky-1-shift;i<kx&&i>=0;i++)
if(x[i]>0)
return 1;for(i=kx-1+shift;i<ky;i++)
if(y[i]>0)
return 0;for(i=k-1;i>=shift;i--)
if(x[i-shift]>y[i])return 1;else if(x[i-shift]<y[i])return 0;return 0;}
function greater(x,y){var i;var k=(x.length<y.length)?x.length:y.length;for(i=x.length;i<y.length;i++)
if(y[i])
return 0;for(i=y.length;i<x.length;i++)
if(x[i])
return 1;for(i=k-1;i>=0;i--)
if(x[i]>y[i])
return 1;else if(x[i]<y[i])
return 0;return 0;}
function divide_(x,y,q,r){var kx,ky;var i,j,y1,y2,c,a,b;copy_(r,x);for(ky=y.length;y[ky-1]==0;ky--);b=y[ky-1];for(a=0;b;a++)
b>>=1;a=bpe-a;leftShift_(y,a);leftShift_(r,a);for(kx=r.length;r[kx-1]==0&&kx>ky;kx--);copyInt_(q,0);while(!greaterShift(y,r,kx-ky)){subShift_(r,y,kx-ky);q[kx-ky]++;}
for(i=kx-1;i>=ky;i--){if(r[i]==y[ky-1])
q[i-ky]=mask;else
q[i-ky]=Math.floor((r[i]*radix+r[i-1])/y[ky-1]);for(;;){y2=(ky>1?y[ky-2]:0)*q[i-ky];c=y2>>bpe;y2=y2&mask;y1=c+q[i-ky]*y[ky-1];c=y1>>bpe;y1=y1&mask;if(c==r[i]?y1==r[i-1]?y2>(i>1?r[i-2]:0):y1>r[i-1]:c>r[i])
q[i-ky]--;else
break;}
linCombShift_(r,y,-q[i-ky],i-ky);if(negative(r)){addShift_(r,y,i-ky);q[i-ky]--;}}
rightShift_(y,a);rightShift_(r,a);}
function carry_(x){var i,k,c,b;k=x.length;c=0;for(i=0;i<k;i++){c+=x[i];b=0;if(c<0){b=-(c>>bpe);c+=b*radix;}
x[i]=c&mask;c=(c>>bpe)-b;}}
function modInt(x,n){var i,c=0;for(i=x.length-1;i>=0;i--)
c=(c*radix+x[i])%n;return c;}
function int2bigInt(t,bits,minSize){var i,k,buff;k=Math.ceil(bits/bpe)+1;k=minSize>k?minSize:k;buff=new Array(k);copyInt_(buff,t);return buff;}
function str2bigInt(s,base,minSize){var d,i,j,x,y,kk;var k=s.length;if(base==-1){x=new Array(0);for(;;){y=new Array(x.length+1);for(i=0;i<x.length;i++)
y[i+1]=x[i];y[0]=parseInt(s,10);x=y;d=s.indexOf(',',0);if(d<1)
break;s=s.substring(d+1);if(s.length==0)
break;}
if(x.length<minSize){y=new Array(minSize);copy_(y,x);return y;}
return x;}
var bb=base,p=0;var b=base==1?k:0;while(bb>1){if(bb&1)p=1;b+=k;bb>>=1;}
b+=p*k;x=int2bigInt(0,b,0);for(i=0;i<k;i++){d=digitsStr.indexOf(s.substring(i,i+1),0);if(base<=36&&d>=36)
d-=26;if(d>=base||d<0){break;}
multInt_(x,base);addInt_(x,d);}
for(k=x.length;k>0&&!x[k-1];k--);k=minSize>k+1?minSize:k+1;y=new Array(k);kk=k<x.length?k:x.length;for(i=0;i<kk;i++)
y[i]=x[i];for(;i<k;i++)
y[i]=0;return y;}
function equalsInt(x,y){var i;if(x[0]!=y)
return 0;for(i=1;i<x.length;i++)
if(x[i])
return 0;return 1;}
function equals(x,y){var i;var k=x.length<y.length?x.length:y.length;for(i=0;i<k;i++)
if(x[i]!=y[i])
return 0;if(x.length>y.length){for(;i<x.length;i++)
if(x[i])
return 0;}else{for(;i<y.length;i++)
if(y[i])
return 0;}
return 1;}
function isZero(x){var i;for(i=0;i<x.length;i++)
if(x[i])
return 0;return 1;}
function bigInt2str(x,base){var i,t,s="";if(s6.length!=x.length)
s6=dup(x);else
copy_(s6,x);if(base==-1){for(i=x.length-1;i>0;i--)
s+=x[i]+',';s+=x[0];}
else{while(!isZero(s6)){t=divInt_(s6,base);s=digitsStr.substring(t,t+1)+s;}}
if(s.length==0)
s="0";return s;}
function dup(x){var i,buff;buff=new Array(x.length);copy_(buff,x);return buff;}
function copy_(x,y){var i;var k=x.length<y.length?x.length:y.length;for(i=0;i<k;i++)
x[i]=y[i];for(i=k;i<x.length;i++)
x[i]=0;}
function copyInt_(x,n){var i,c;for(c=n,i=0;i<x.length;i++){x[i]=c&mask;c>>=bpe;}}
function addInt_(x,n){var i,k,c,b;x[0]+=n;k=x.length;c=0;for(i=0;i<k;i++){c+=x[i];b=0;if(c<0){b=-(c>>bpe);c+=b*radix;}
x[i]=c&mask;c=(c>>bpe)-b;if(!c)return;}}
function rightShift_(x,n){var i;var k=Math.floor(n/bpe);if(k){for(i=0;i<x.length-k;i++)
x[i]=x[i+k];for(;i<x.length;i++)
x[i]=0;n%=bpe;}
for(i=0;i<x.length-1;i++){x[i]=mask&((x[i+1]<<(bpe-n))|(x[i]>>n));}
x[i]>>=n;}
function halve_(x){var i;for(i=0;i<x.length-1;i++){x[i]=mask&((x[i+1]<<(bpe-1))|(x[i]>>1));}
x[i]=(x[i]>>1)|(x[i]&(radix>>1));}
function leftShift_(x,n){var i;var k=Math.floor(n/bpe);if(k){for(i=x.length;i>=k;i--)
x[i]=x[i-k];for(;i>=0;i--)
x[i]=0;n%=bpe;}
if(!n)
return;for(i=x.length-1;i>0;i--){x[i]=mask&((x[i]<<n)|(x[i-1]>>(bpe-n)));}
x[i]=mask&(x[i]<<n);}
function multInt_(x,n){var i,k,c,b;if(!n)
return;k=x.length;c=0;for(i=0;i<k;i++){c+=x[i]*n;b=0;if(c<0){b=-(c>>bpe);c+=b*radix;}
x[i]=c&mask;c=(c>>bpe)-b;}}
function divInt_(x,n){var i,r=0,s;for(i=x.length-1;i>=0;i--){s=r*radix+x[i];x[i]=Math.floor(s/n);r=s%n;}
return r;}
function linComb_(x,y,a,b){var i,c,k,kk;k=x.length<y.length?x.length:y.length;kk=x.length;for(c=0,i=0;i<k;i++){c+=a*x[i]+b*y[i];x[i]=c&mask;c>>=bpe;}
for(i=k;i<kk;i++){c+=a*x[i];x[i]=c&mask;c>>=bpe;}}
function linCombShift_(x,y,b,ys){var i,c,k,kk;k=x.length<ys+y.length?x.length:ys+y.length;kk=x.length;for(c=0,i=ys;i<k;i++){c+=x[i]+b*y[i-ys];x[i]=c&mask;c>>=bpe;}
for(i=k;c&&i<kk;i++){c+=x[i];x[i]=c&mask;c>>=bpe;}}
function addShift_(x,y,ys){var i,c,k,kk;k=x.length<ys+y.length?x.length:ys+y.length;kk=x.length;for(c=0,i=ys;i<k;i++){c+=x[i]+y[i-ys];x[i]=c&mask;c>>=bpe;}
for(i=k;c&&i<kk;i++){c+=x[i];x[i]=c&mask;c>>=bpe;}}
function subShift_(x,y,ys){var i,c,k,kk;k=x.length<ys+y.length?x.length:ys+y.length;kk=x.length;for(c=0,i=ys;i<k;i++){c+=x[i]-y[i-ys];x[i]=c&mask;c>>=bpe;}
for(i=k;c&&i<kk;i++){c+=x[i];x[i]=c&mask;c>>=bpe;}}
function sub_(x,y){var i,c,k,kk;k=x.length<y.length?x.length:y.length;for(c=0,i=0;i<k;i++){c+=x[i]-y[i];x[i]=c&mask;c>>=bpe;}
for(i=k;c&&i<x.length;i++){c+=x[i];x[i]=c&mask;c>>=bpe;}}
function add_(x,y){var i,c,k,kk;k=x.length<y.length?x.length:y.length;for(c=0,i=0;i<k;i++){c+=x[i]+y[i];x[i]=c&mask;c>>=bpe;}
for(i=k;c&&i<x.length;i++){c+=x[i];x[i]=c&mask;c>>=bpe;}}
function mult_(x,y){var i;if(ss.length!=2*x.length)
ss=new Array(2*x.length);copyInt_(ss,0);for(i=0;i<y.length;i++)
if(y[i])
linCombShift_(ss,x,y[i],i);copy_(x,ss);}
function mod_(x,n){if(s4.length!=x.length)
s4=dup(x);else
copy_(s4,x);if(s5.length!=x.length)
s5=dup(x);divide_(s4,n,s5,x);}
function multMod_(x,y,n){var i;if(s0.length!=2*x.length)
s0=new Array(2*x.length);copyInt_(s0,0);for(i=0;i<y.length;i++)
if(y[i])
linCombShift_(s0,x,y[i],i);mod_(s0,n);copy_(x,s0);}
function squareMod_(x,n){var i,j,d,c,kx,kn,k;for(kx=x.length;kx>0&&!x[kx-1];kx--);k=kx>n.length?2*kx:2*n.length;if(s0.length!=k)
s0=new Array(k);copyInt_(s0,0);for(i=0;i<kx;i++){c=s0[2*i]+x[i]*x[i];s0[2*i]=c&mask;c>>=bpe;for(j=i+1;j<kx;j++){c=s0[i+j]+2*x[i]*x[j]+c;s0[i+j]=(c&mask);c>>=bpe;}
s0[i+kx]=c;}
mod_(s0,n);copy_(x,s0);}
function trim(x,k){var i,y;for(i=x.length;i>0&&!x[i-1];i--);y=new Array(i+k);copy_(y,x);return y;}
function powMod_(x,y,n){var k1,k2,kn,np;if(s7.length!=n.length)
s7=dup(n);if((n[0]&1)==0){copy_(s7,x);copyInt_(x,1);while(!equalsInt(y,0)){if(y[0]&1)
multMod_(x,s7,n);divInt_(y,2);squareMod_(s7,n);}
return;}
copyInt_(s7,0);for(kn=n.length;kn>0&&!n[kn-1];kn--);np=radix-inverseModInt(modInt(n,radix),radix);s7[kn]=1;multMod_(x,s7,n);if(s3.length!=x.length)
s3=dup(x);else
copy_(s3,x);for(k1=y.length-1;k1>0&!y[k1];k1--);if(y[k1]==0){copyInt_(x,1);return;}
for(k2=1<<(bpe-1);k2&&!(y[k1]&k2);k2>>=1);for(;;){if(!(k2>>=1)){k1--;if(k1<0){mont_(x,one,n,np);return;}
k2=1<<(bpe-1);}
mont_(x,x,n,np);if(k2&y[k1])
mont_(x,s3,n,np);}}
function mont_(x,y,n,np){var i,j,c,ui,t,ks;var kn=n.length;var ky=y.length;if(sa.length!=kn)
sa=new Array(kn);copyInt_(sa,0);for(;kn>0&&n[kn-1]==0;kn--);for(;ky>0&&y[ky-1]==0;ky--);ks=sa.length-1;for(i=0;i<kn;i++){t=sa[0]+x[i]*y[0];ui=((t&mask)*np)&mask;c=(t+ui*n[0])>>bpe;t=x[i];j=1;for(;j<ky-4;){c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++;}
for(;j<ky;){c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++;}
for(;j<kn-4;){c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++;}
for(;j<kn;){c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++;}
for(;j<ks;){c+=sa[j];sa[j-1]=c&mask;c>>=bpe;j++;}
sa[j-1]=c&mask;}
if(!greater(n,sa))
sub_(sa,n);copy_(x,sa);}
var BigInt={str2bigInt:str2bigInt,bigInt2str:bigInt2str,int2bigInt:int2bigInt,multMod:multMod,powMod:powMod,inverseMod:inverseMod,randBigInt:randBigInt,randBigInt_:randBigInt_,equals:equals,equalsInt:equalsInt,sub:sub,mod:mod,mod_:mod_,modInt:modInt,mult:mult,divInt_:divInt_,rightShift_:rightShift_,leftShift_:leftShift_,dup:dup,greater:greater,add:add,addInt:addInt,addInt_:addInt_,isZero:isZero,bitSize:bitSize,randTruePrime:randTruePrime,millerRabin:millerRabin,divide_:divide_,trim:trim,expand:expand,bpe:bpe,primes:primes,findPrimes:findPrimes,getSeed:getSeed}
var randomBitInt
function seedRand(buf){var state=new Salsa20([buf[0],buf[1],buf[2],buf[3],buf[4],buf[5],buf[6],buf[7],buf[8],buf[9],buf[10],buf[11],buf[12],buf[13],buf[14],buf[15],buf[16],buf[17],buf[18],buf[19],buf[20],buf[21],buf[22],buf[23],buf[24],buf[25],buf[26],buf[27],buf[28],buf[29],buf[30],buf[31]],[buf[32],buf[33],buf[34],buf[35],buf[36],buf[37],buf[38],buf[39]])
var width=256,chunks=6,significance=Math.pow(2,52),overflow=significance*2
function numerator(){var bytes=state.getBytes(chunks)
var i=0,r=0
for(;i<chunks;i++){r=r*width+bytes[i]}
return r}
function randomByte(){return state.getBytes(1)[0]}
randomBitInt=function(k){if(k>31)throw new Error("Too many bits.")
var i=0,r=0
var b=Math.floor(k/8)
var mask=(1<<(k%8))-1
if(mask)r=randomByte()&mask
for(;i<b;i++)
r=(256*r)+randomByte()
return r}
return function(){var n=numerator(),d=Math.pow(width,chunks),x=0
while(n<significance){n=(n+x)*width
d*=width
x=randomByte()}
while(n>=overflow){n/=2
d/=2
x>>>=1}
return(n+x)/d}}
function getSeed(){var buf
if((typeof crypto!=='undefined')&&(typeof crypto.randomBytes==='function')){try{buf=crypto.randomBytes(40)}catch(e){throw e}}else if((typeof crypto!=='undefined')&&(typeof crypto.getRandomValues==='function')){buf=new Uint8Array(40)
crypto.getRandomValues(buf)}else{throw new Error('Keys should not be generated without CSPRNG.')}
return Array.prototype.slice.call(buf,0)};(function seed(){Math.random=seedRand(getSeed())
if(typeof setTimeout==='function'&&typeof document!=='undefined')
setTimeout(seed,5*60*1000)}())
return BigInt}))