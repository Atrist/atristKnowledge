## VPN
VPN是指在公用网络上建立一个私有的、专用的虚拟通信网络。

VPN网络和VPN技术通常是如何分类的呢？

根据建设单位不同分类:

这种分类根据VPN网络端点设备（关键设备）由运营商提供，还是由企业自己提供来划分。
- 租用运营商VPN专线搭建企业VPN网络:目前主要指租用运营商MPLS VPN专线，比如联通、电信都提供MPLS VPN专线服务。跟传统的租用传输专线（比如租用E1、SDH专线）相比，MPLS VPN专线的优势主要在于线路租用成本低。 

    ![](../images/53859e8e998bd.png)
- 用户自建企业VPN网络：目前最常用的就是**基于Internet建立企业VPN网络**，具体技术包括GRE、L2TP、IPSec、SSL VPN等。这种方案企业只需要支付设备购买费用和上网费用，没有VPN专线租用费用；另外企业在网络控制方面享有更多的主动权、更方便企业进行网络调整。**强叔要分享的正是这类VPN**。

    ![](../images/53859ea00f0f3.png)

根据组网方式不同分类:
- 远程访问VPN(Access VPN): 适合出差员工VPN拨号接入的场景。员工可以在任何能够接入公网的地方，通过远程拨号接入企业内网，从而访问内网资源。
  
  ![](../images/53859ec576ae8.png)

- 局域网到局域网的VPN（也称为网关到网关的VPN）：它适用于公司两个异地机构的局域网互连。 

    ![](../images/53859ed1c9cdc.png)


根据应用场景不同分类:
- 远程访问VPN: Access VPN 面向出差员工. 允许出差员工跨越公用网络远程接入公司内部网络。
- Intranet VPN（企业内部虚拟专网）：Intranet VPN通过公用网络进行企业内部各个网络的互连。
- Extranet VPN（扩展的企业内部虚拟专网）：Extranet VPN是指利用VPN将企业网延伸至合作伙伴处，使不同企业间通过公网来构筑VPN。Intranet VPN 和Extranet VPN的不同点主要在于访问公司总部网络资源的权限有区别。 

![](../images/53859ee268412.png)

按照VPN技术实现的网络层次进行分类： 

- 基于数据链路层的VPN：L2TP、L2F、PPTP。其中L2F和PPTP已经基本上被L2TP替代了，强叔不再关注这两种技术了。
- 基于网络层的VPN：GRE、IPSec。
- 基于应用层的VPN：SSL。

基于Internet的VPN技术有一个共同点就是必须解决VPN网络的安全问题： 

- 出差员工的地理接入位置不固定，其所处位置往往不受企业其他信息安全措施的保护，所以需要对出差员工进行严格的接入认证，并且对出差员工可以访问的资源和权限进行精确控制。接入认证涉及身份认证技术。
- 合作伙伴需要根据业务开展的情况，灵活进行授权，限制合作伙伴可以访问的网络范围、可以传输的数据类型。此时推荐对合作伙伴进行身份认证，认证通过后进行可以通过策略配置等对合作伙伴的权限进行限制。
- 另外分支机构、合作伙伴和出差用户与公司总部之间的数据传输都必须是安全的。都涉及数据加密和数据验证技术。

下面简单讲解一下VPN用到的几个关键技术点：

### 1. 隧道技术
隧道技术是VPN的基本技术，类似于点到点连接技术。它的基本过程就是在数据进入源VPN网关后，将数据“封装”后通过公网传输到目的VPN网关后再对数据“解封装”。“封装/解封装”过程本身就可以为原始报文提供安全防护功能，所以被封装的数据包在互联网上传递时所经过的逻辑路径被称为“隧道”。不同的VPN技术封装/解封装的过程完全不同，具体封装过程在每个协议中详细介绍。

![](../images/53859eff9a5c4.png)

### 2. 身份认证技术
主要用于移动办公的用户远程接入的情况, 通过对用户的身份进行认证, 确保接入内部网络的用户是合法用户,而非恶意用户

不同的VPN技术能够提供的用户身份认证方法不同:
- GRE不支持身份认证技术。
- L2TP：依赖PPP提供的认证（比如CHAP、PAP、EAP）。接入用户的用户名和密码本地认证也可以通过RADIUS服务器认证。认证通过以后再给用户分配内部的IP地址，通过此IP地址对用户进行授权和管理。
- IPSec：通过IKEv2拨号时，支持进行EAP认证。接入用户的用户名和密码可以本地认证可以通过RADIUS服务器认证。认证通过以后再给用户分配内部的IP地址，通过此IP地址对用户进行授权和管理。另外IPSec还支持数据源认证，在下面的数据验证技术里进行说明。
- SSL VPN：支持本地认证、证书认证和服务器认证。主要是对服务器进行身份认证，确认Web网页的合法性。

### 3. 加密技术
加密技术就是把能读懂的报文变成无法读懂的报文，也就是把明文变成密文，这样即便是有黑客获取了报文也无法知道其真实含义。加密对象有数据报文和协议报文之分，能够实现协议报文和数据报文都加密的协议安全系数更高。
- GRE和L2TP协议本身不提供加密技术，所以通常结合IPSec协议一起使用，使用IPSec的加密技术。
- IPSec：支持数据报文和协议报文加密。IPSec一般采用对称密钥算法加密数据。对称加密算法采用相同的密钥加密和解密数据。

    ![](../images/53859f1927bfa.png)
- SSL VPN：支持数据报文和协议报文加密。SSL VPN采用公钥体制进行加密。公钥体制加密跟对称密钥加密的差别在于加密和解密的所用的密钥是不同的密钥。采用公钥进行加密，私钥进行解密。公钥和私钥一一对应。


### 4. 数据验证技术
数据验证技术就是对收到的报文进行验货. 对于伪造的, 被篡改的数据进行丢弃.那么验证是如何实现的呢？它采用一种称为“摘要”的技术。“摘要”技术主要采用HASH函数将一段长的报文通过函数变换，映射为一段短的报文。在收发两端都对报文进行验证，只有摘要一致的报文才被认可。
- GRE: 本身指提供简单的校验和验证和关键字验证, 但可结合IPSec协议一起使用, 使用IPSec的数据验证技术
- L2TP: 本身不提供数据验证技术, 但可结合IPSec协议一起使用,使用IPSec的数据验证技术
- IPSec: 支持对数据及逆行完整性验证和数据源验证, 在IPSec的数据验证和加密通常一起使用, 对加密后的报文HMAC(Keyed-Hash Message Authentication Code)生成摘要, 提供数据的安全性. 那么验证是如何实现的呢？它采用一种称为“摘要”的技术。“摘要”技术主要采用HASH函数将一段长的报文通过函数变换，映射为一段短的报文。在收发两端都对报文进行验证，只有摘要一致的报文才被认可。

    ![](../images/53859f2d55772.png)

- SSL VPN：支持对数据进行完整性验证和数据源验证。SSL VPN采用公钥体制，利用Hash算法生成摘要，再用私钥加密摘要生成数字签名。利用公钥进行解密。利用公钥和私钥的一一的关系可以对数据源进行认证。

下面强叔总结一下GRE、L2TP、IPSec和SSL VPN常用的安全技术和使用的场景：

![](../images/53859f1927bfa.png)

## GRE
被Internet互联以后的私有网络就面临着以下几个痛苦：
1. 私有IP网络之间无法直接通过Internet互通.

    这个不用强叔多说，私有网络中使用的都是私有地址，而在Internet上传输的报文必须使用公网地址。

    ![](../images/53904bfc63258.png)

2. 异种网络（IPX、AppleTalk）之间无法通过Internet直接进行通信。

    这个痛苦是先天性造成的，IPX和IP本就不是同一种网络协议，因此IP网络不转发IPX报文，这倒也情有可原。 

    ![](../images/53904c0e920ea.png)

3. 私网之间部署的动态路由无法跨越Internet。

   …


### GRE
GRE（General Routing Encapsulation）即通用路由封装协议.其实说穿了也很简单，GRE用的就是当下流行的“马甲”技术。既然私有网络发出的报文由于种种原因不能在Internet上进行传输，那何不给这些报文穿上能让Internet识别的“马甲”（GRE封装），再让它在Internet上传输。反正对于Internet而言，它是只认“马甲”不认人。这种“马甲”技术在网络中的专用术语就是“封装”。


但凡一种网络封装技术，其基本的构成要素都可以分为3个部分：乘客协议、封装协议、运输协议，GRE也不例外。

- 乘客协议：为了便于理解封装技术，我们用邮政系统打个比方。乘客协议就是我们写的信，信的语言可以是汉语、英语、法语等，具体如何解释由写信人、读信人自己负责。 
- 封装协议：封装协议可以理解为信封，可能是平信、挂号或者是EMS，这对应于多种封装协议。
- 运输协议：运输协议就是信的运输方式，可以是陆运、海运或者空运，这对应于不同的运输协议。

OK，理解了这个以后，我们再来看看GRE中都用到了哪些协议。 

![](../images/53904c19ea11f.png)

从图中我们可以很清晰的看到，GRE能够承载的协议包括IP协议、IPX协议，GRE所使用的运输协议是IP协议。
了解了GRE的一些基本概念和应用以后，下面强叔将为大家讲解一下GRE的封装原理。

![](../images/53904c313c9e7.png)

GRE的封装过程可以细分成两步，第一步是在私有数据中添加GRE头，第二步是在GRE头前面再加上新的IP头。加上新的IP头以后，就意味着这个私有网络的报文在经过层层封装以后就可以在Internet上传输了。

从产品实现的角度来讲，上述的封装操作是通过一个逻辑接口来实现的，这个逻辑接口就是鼎鼎有名的Tunnel接口。Tunnel即隧道，从名字就可以看出来这个逻辑接口就是为隧道而生。由于Tunnel接口是一个通用的隧道接口，所以GRE协议在使用这个接口的时候，我们会要求将这个接口的封装协议设置为GRE协议。

下面强叔将结合Tunnel接口介绍一下防火墙对GRE流量的转发过程，见下图。

![](../images/53904c551fe53.png)

1. 企业的私网流量到达防火墙的入接口，防火墙查询路由表对此流量进行转发。
2. 防火墙根据路由查找结果，将此流量引导到Tunnel接口进行GRE封装。
3. 封装后的GRE报文再次查找路由进行流量转发。
4. 防火墙根据路由查找结果，找到出接口，并将流量发送到Internet。

这就是防火墙对私网流量进行GRE封装和转发的全过程，很简单吧。

有些小伙伴肯定在想了，强叔这里只介绍了封装过程，那隧道对端是如何解封装的？

其实解封装也很简单。首先隧道对端在接收到报文以后，先根据该报文目的地址判断是不是发给自己的，在

明确报文是发给自己以后，再去判断这个报文是不是GRE报文。怎么判断呢？在封装原理那幅图中我们可以看

到封装后的GRE报文会有个新的IP头，这个新的IP头中有个Protocol字段，字段中标识了内层协议类型，如果这

个Protocol字段值是47，就表示这个报文是GRE报文。

#### GRE隧道的配置方法

![](../images/53904c6f8fcc1.png)

GRE隧道的配置也很简单，可以分为两个步骤。
1. 配置Tunnel接口的封装参数（配置数据以Firewall_A为例）。 

    ```bash
    interface Tunnel 1

    ip address 1.1.1.1 24

    tunnel-protocol gre

    source 202.38.167.1

    destination 202.38.163.1
    ```
    首先设置Tunnel接口的封装类型为GRE，然后指定GRE隧道的源和目的就OK了。GRE隧道中大家容易产生疑惑的地方在配置Tunnel接口的IP地址。有很多小伙伴会有这么几个问题。
    
    a．Tunnel接口的IP地址是否必须配置？

    b．隧道两端的Tunnel接口IP地址是否有所关联？

    c． Tunnel接口使用的是公网IP地址还是私网IP地址？

    首先Tunnel接口的IP地址必须配置，如果不配置IP地址，Tunnel接口就无法UP起来。其次，从GRE的封装过程来看，Tunnel接口的IP地址并没有参与报文封装，所以隧道两端的Tunnel接口没有任何关联，各配各的。再者，既然Tunnel接口不参与封装，所以也就没有必要用公网地址了，配置成私网就可以了。

2. 配置路由，将要进行GRE封装的流量引流到Tunnel接口。

    把流量引入到GRE隧道有两种方法，一种是静态路由，一种是动态路由。

    - 静态路由配置： `ip route-static 192.168.2.0 24 Tunnel 1`

    - 动态路由配置：如果私网内部使用的是动态路由（例如OSPF），则只要把私网地址和Tunnel接口地址一起通过OSPF发布出去即可。
        ```bash
        ospf 1

        area 0

        network 1.1.1.0 0.0.0.255

        network 192.168.2.0 0.0.0.255
        ```

        此时有一个特殊的地方需要注意，就是如果GRE隧道对应的公网接口也使用了OSPF，那我们就需要用一个新的OSPF进程来发布私网地址和Tunnel接口地址。

GRE的配置很简单，强叔就不多说了。结合平时遇到的一些GRE问题，强叔再做一些扩展。

有些小伙伴可能会有担忧，说如果Internet上的恶意有用户伪装成Firewall_A向Firewall_B发送GRE报文，那伪装者不就可以访问Firewall_B中的资源了呢？那么Firewall_A和Firewall_B在建立GRE隧道时，是如何做到互信的呢？下面强叔讲一下GRE的安全机制。

防火墙配置了GRE隧道，并不是说防火墙收到所有的GRE报文它都会进行处理。它只处理与本防火墙建立GRE隧道的对端设备发过来的GRE报文。具体做法就是建立GRE隧道的两台设备要设置一个“密钥”，这个密钥就是身份凭证，密钥信息被封装在GRE报文的头部。当一端收到一个GRE报文以后，都会检查该密钥，只有在密钥一致时，才认为是隧道对端发过来的GRE报文。“身份校验”不通过，该GRE报文会被丢弃。下图就是一个GRE报文，其中GRE报文头中的key字段为1表示用户设置了身份验证功能，下面的GRE key：0x0001e240是用户配置的密钥值。

![](../images/53904c85b4902.png)

虽然身份校验机制可以保证GRE隧道两端可以实现互信，但是如果报文在Internet传输途中被其他用户恶意篡改，这又该怎么办？这里我们还得用到GRE头中的另一个字段checksum。GRE封装报文时，会根据报文信息计算校验和，并将这个校验和插入到checksum字段中。

当隧道对端收到该报文时，对端也会根据报文信息计算校验和，并与报文中携带的校验和进行比较，如果校验结果一致，则接受此报文；如果不一致，则丢弃。下图中checksum为1，表示启用了校验和功能，下面checksum:0x6dbd是校验和对应的值。

![](../images/53904c994d990.png)

GRE的安全机制可以实现隧道两端的互信，并保证报文传输的完整性。但是这里还有一个问题，就是如果隧道对端设备出现故障时，隧道本端如何感知的呢？

GRE隧道是一种无状态类型的隧道，所谓的无状态类型是指隧道本端并不维护与对端的状态。换句话说假如隧道对端出现故障，那隧道本端是感受不到的。为了解决这个问题，GRE隧道提供了一种保活机制（keepalive）。GRE隧道源会周期性的向隧道对端发送keepalive报文，以检测隧道对端状态。如果GRE隧道对端出现问题，则隧道源的Tunnel接口状态会被置为Down，即本端关闭GRE隧道。这就避免了因对端不可达而造成的数据黑洞。GRE的Keepalive功能是单向的，对端是否支持或启用Keepalive功能不影响本端的Keepalive功能。实际配置时，建议隧道两边都配置上保活功能。

![](../images/53904ca77173a.png)

小伙伴们看到这里觉得是不是有了GRE隧道就万事大吉了，其实不然。强叔要告诉大家的是GRE自身有个缺陷，就是GRE技术不带有安全加密功能。没有加密功能的GRE报文，只能说是穿了个透明的马甲，它所要传输的数据别人可以看得一清二楚。所以我们在实际使用时，很少单纯使用GRE，而是经常与IPSec技术联用。由于IPSec技术具备很强的加密功能，就解决了GRE的安全性问题。这也就是我们经常听到的GRE over IPSec技术

## L2TP VPN
那个时代个人用户和企业用户大都通过电话线上网，当然企业分支机构和出差用户一般也通过“电话网络（学名叫PSTN（Public Switched Telephone Network）/ISDN（integrated services digital network））”来访问总部网络，人们将这种基于PSTN/ISDN的VPN命名为VPDN（Virtual Private Dial Network）。

在传统的基于PSTN/ISDN的L2TP VPN中，运营商在PSTN/ISDN和IP网络之间部署LAC（在VPDN里称为NAS，Network Access Server），集中为多个企业用户提供L2TP VPN专线服务，配套提供认证和计费功能。当分支机构和出差员工拨打L2TP VPN专用接入号时，接入modem通过PPP协议与LAC建立PPP会话，同时启动认证和计费。认证通过后LAC向LNS发起L2TP隧道和会话协商，企业总部的LNS出于安全考虑，再次认证接入用户身份，认证通过后分支机构和出差员工就可以访问总部网络了。

![](../images/539666db1d3bc.png)

说明：LAC和LNS是L2TP协议里的概念，NAS是VPDN里的概念，在L2TP VPN中LAC实际上就是NAS。 

随着IP网络的普及，PSTN/ISDN网络逐渐退出数据通信领域。企业和个人用户都可以自由通过以太网直接接入Internet了，此时L2TP VPN也悄悄地向前“迈了两小步”――看似只有两小步，但这两小步却让L2TP VPN这个过气明星留在了风云变化的IP舞台上。（强叔感叹，在通信领域，不学习、不进步只能被拍死在沙滩上啊！）
现在L2TP VPN常用场景如下图所示。

![](../images/5396674344118.png)

- 两小步之一――PPP屈尊落户以太网：这是拨号网络向以太网演进过程中的必经之路，并非专门为L2TP VPN设计，但L2TP VPN确实是最大的受益者。分支机构用户安装PPPoE Client，在以太网上触发PPPoE拨号，在PPPoE Client和LAC（PPPoE Server）之间建立PPPoE会话。LAC和LNS之间的L2TP VPN建立过程没有变化。
- 两小步之二――L2TP延伸到用户PC：这种场景下，PC可以通过系统自带的L2TP客户端或第三方L2TP客户端软件直接拨号与LNS建立L2TP VPN。L2TP Client摒弃了LAC这位“掮客”跟总部直接建立合作关系，看来这种事情在哪里都会发生啊！

这两种场景跟初始L2TP VPN场景相比有一个共同特征，就是企业借用了“运营商管道（Internet）” 自建VPN，避开了运营商VPN专线业务收费。为区分这两种L2TP VPN，前者（基于LAC拨号的L2TP VPN）被称为NAS-Initiated VPN，后者（客户端直接拨号的L2TP VPN）被称为Client-Initiated VPN。

## L2TP Client-Initiated VPN
VPN客户端的作用就是帮助用户在PC或PAD或手机上触发建立一条直通公司总部网络的隧道，实现用户自由访问总部网络的意愿。

都教授要借助L2TP客户端穿越“虫洞”进入公司网络，必然要先通过“门神”LNS的身份检查（检查手段毫不含糊，用户名称、密码、主机名称、隧道验证应有尽有）。LNS为通过验证的用户发放特别通行证（公司内网IP地址），对试图混入的人说bye-bye。Client-Initiated VPN配置中体现的就这样一个简单的思路（本例仅给出本地认证配置）：

#### L2TP Client

- 对端IP地址
- 登录用户（PPP用户）名称
- 登录用户（PPP用户）密码
- 主机名称（可选，也叫隧道名称。Windows自带的L2TP客户端无法配置隧道名称。）
-  PPP认证模式（PAP/CHAP/EAP，有些客户端默认CHAP）
- 隧道验证（可选，有些客户端不支持）

前三项是必配内容，后三项可能会因客户端不同有所取舍。 

#### LNS
```bash
L2tp enable
l2tp domain suffix-separator @     
interface LoopBack0  
 ip address 192.168.5.1 255.255.255.0

interface Virtual-Template1 
 ppp authentication-mode chap   
 ip address unnumbered interface LoopBack0  
 remote address pool         
l2tp-group 1          
 undo tunnel authentication  
 allow l2tp virtual-template 1 remote client1 //指定VT接口和对端主机名称 。对端使用Windows自带的L2TP客户端时不指定对端主机名称。  
 tunnel name LNS         //本端隧道名称 
 tunnel timer hello 0 
aaa
local-user l2tp@radius password cipher %$%$y>z_1xG|mINC.~+P.b()4+"v%$%$  //本地用户名、密码  
local-user l2tp@radius service-type ppp  
domain radius
ip pool 0 10.21.80.1 10.21.80.254
```
VT接口大家感觉比较陌生吧？它是用于二层协议通信的逻辑接口，比如PPP和L2TP协议通信、PPP和Ethernet协议通信，都会用到它，所以在L2TP VPN中要开启VT接口所在安全区域跟L2TP物理接口所在安全区域之间的包过滤，保证PPP和L2TP协议通信畅通无阻。


思想是神经元活动的结果，配置最终体现到一系列的消息交互中。配置不太复杂，但消息交互可不太简单。为了让大家一目了然，并方便跟下期的NAS-Initiated VPN做对比，强叔画了一张简图，然后对着这张图对L2TP Client与LNS之间的消息交互进行深入剖析。

![](../images/539a74a565403.png)
结合抓包情况来讲解一下Client-Initiated VPN建立的完整过程：


### 阶段1 建立L2TP隧道（控制连接）：3条消息协商进入虫洞时机
L2TP Client和LNS通过交互三条消息协商隧道ID、UDP端口（LNS用1701端口响应Client隧道建立请求）、主机名称、L2TP的版本、隧道验证（Client不支持隧道验证时LNS的隧道验证要关闭，例如WIN7操作系统）等参数。

![](../images/539a74b7497a9.png)

仅给出隧道ID协商过程：
#### 步骤一
Client：LNS兄，用88作为Tunnel ID跟我通信吧。

![](../images/539a74cf3ee6e.png)

#### 步骤2

LNS：OK。Client，用1作为Tunnel ID跟我通信。

![](../images/539a74dedda09.png)

#### 步骤3
Client：OK。

### 阶段2 建立L2TP会话：3条消息唤醒虫洞门神

L2TP Client和LNS通过交互三条消息协商Session ID，建立L2TP会话。跟“门神”对上话了，才可能提交身份认证材料呀！

![](../images/539a74ee26d3e.png)

注：ZLB表示目前空闲，没有消息要发送。

Session ID协商过程
#### 步骤一
Client：LNS，采用1作为Session ID跟我通信吧。

![](../images/539a7507ef980.png)

#### 步骤二
LNS：OK。Client，采用37作为Session ID跟我通信吧。

![](../images/539a7521a4ea5.png)

#### 步骤三
Client:Ok
### 阶段三 创建PPP连接：身份认证，发放特别通行证
1. LCP协商。LCP协商是两个方向分开协商的，主要协商MRU大小。

    **说明：MRU 是PPP的数据链路层参数，类似以太网中的MTU。如果PPP链路一端设备发送的报文载荷大于对端的 MRU，这个报文在传送时就会被分片。**

    ![](../images/539a753584711.png)

2. PPP验证。

    验证方式包括CHAP、PAP、EAP（高端防火墙不支持），CHAP或PAP可以在本地认证、也可在AAA服务器上认证；EAP只能在AAA服务器上进行认证。EAP认证比较复杂，我们等到IPSec部分再详解，此处仅给出最常用的CHAP验证过程：

    ![](../images/539a75483f210.png)

    经典的三次握手过程：
    #### 步骤一
    LNS：Client，发给你一个“挑战（Challenge）”，用它来加密你的密码吧。

    ![](../images/539a7558e45cb.png)

    #### 步骤二
    Client：OK，把我的用户名和加密后的密码发给你，请验证。

    ![](../images/539a756b166c3.png)

    #### 步骤三
    LNS：验证通过，欢迎来到PPP的世界。

    ![](../images/539a757ba29a4.png)

    LNS（或AAA服务器）上配置的用户名和密码是用来验证Client的，当然要求“本人”和“签证”完全一致，即要求L2TP Client和LNS上配置的用户名和密码完全一致。**这里详解一下什么叫用户名完全一致**：

    - 如果在LNS上配置的签证为username（没有domain），则L2TP Client登录的用户名也要是username。
    - 如果在LNS上配置的签证为fullusername（username@default或username@domain），则L2TP Client登录的用户名也要是username@default或username@domain。

    这是很多人问过的问题，道理很简单，但却是大家干活时常犯的错误。
    **讲了半天domain的问题，大家会不会问划分domain有何意义？**

    对于大企业来说，往往会按部门来划分多个domain， LNS（或AAA服务器）都支持根据domain给不同部门创建不同的地址池，也就是不同部门的网段可以通过地址池规划分开，这样方便后续部署不同的访问控制策略。
3. IPCP协商，成功后分配IP地址。

    分配给Client的IP地址是10.21.80.2，后续交互的报文都是由10.21.80.2??Client的私网地址发出的。

    ![](../images/539a758d62d8d.png)


    **看到这里大家会不会问VT接口地址、地址池地址和总部网络地址如何规划？注意以下两点即可：**

    1. 首先，VT接口地址和地址池地址可以规划在同一网段，也可以不在同一网段。如果在同一网段，请将两者配置为不重叠的地址，即VT接口地址不能包含在地址池地址中。
    2. 其次，建议把地址池地址和总部网络地址规划为不同的网段。如果万不得已，将地址池地址和总部网络地址配置为同一网段后，则必须在LNS连接总部网络的接口上开启ARP代理功能，并且开启L2TP虚拟转发功能，保证LNS可以对总部网络服务器发出的ARP请求进行应答。

    假设LNS连接总部网络的接口是GigabitEthernet1/1/16，开启ARP代理功能和L2TP虚拟转发功能的配置如下： 
    ```bash
    interface GigabitEthernet1/1/16
    ip address 192.168.0.1 255.255.255.0
    arp-proxy enable     //开启ARP代理功能
    virtual-l2tpforward enable     //开启L2TP虚拟转发功能
    ```

**总结一下Client-Initiated VPN的特点：**

- L2TP VPN跟GRE VPN有很大不同。GRE VPN没有隧道协商过程，是没有控制连接的隧道，是没有状态的隧道，所以也无法查看隧道、检查隧道状态。但L2TP VPN是有控制连接的隧道，可以查看到隧道和会话。（IPSec VPN表现的更好，后续再讲）
- 对于Client-Initiated VPN来说Client和LNS之间存在一条L2TP隧道，隧道中只有一条L2TP会话，PPP连接就承载在此L2TP会话上。（这一点跟NAS-Initiated VPN不同，需要关注一下）

L2TP Client

![](../images/539a75a04106b.png)

### 阶段4 数据封装传输：穿越虫洞，访问地球
想把都教授如何穿越虫洞的过程讲清楚很困难，但是把L2TP客户端的数据如何穿越L2TP隧道达到总部网络的过程讲清楚不太难，这就涉及到了L2TP数据报文的封装过程。这个过程跟GRE报文穿“马甲”脱“马甲”的过程很相似，不同的是马甲的样式有点变化：

![](../images/539a75b5de34a.png)

说明：本例中是两个Client之间通信，所以私有IP地址为两个内网地址。

![](../images/539a75c9026ae.png)

至此，L2TP Client可以畅通无阻访问总部网络了，就像都教授穿过虫洞回到温暖的家。但有一个疑问，Client发出的报文进入隧道到达总部服务器没有问题了，但从总部服务器到Client的回程报文是如何进入隧道返回Client的？我们似乎并没有配置什么路由将回程报文引导到隧道呀？查看LNS路由表，发现了一个有趣的现象：LNS为获得私网IP地址的Client自动下发了一条主机路由。

![](../images/539a75d98f40c.png)

这条自动生成的主机路由协议类型为UNR（User Network Route），下一跳为Client本身的地址，出接口是InLoopBack0。这条路由就是LNS上虫洞的入口，指引去往Client的报文进入虫洞，回程报文就不愁找不到隧道入口了。看来在虫洞建立时，L2TP就已经为都教授的来去自如做好了充分准备，那还有什么可担心的呢？

上文我们只使用了一个Client来讲解，实际环境中会有多个Client同时穿过虫洞访问总部网络。如果Client已经不满足只访问总部网络，还想访问其他的Client，即Client之间实现相互访问，L2TP能做到吗？别忘了，LNS是连接多个虫洞的中转站，通过LNS来转发，两个Client之间也可以自如访问。当然，前提是双方要知道LNS为对方分配的IP地址。


![](../images/539a75eb3dc0c.png)

## L2TP NAS-Initiated VPN
Client-Initiated VPN可以让企业出差员工像都教授一样穿越“虫洞”，来去自如地访问总部网络。而企业分支机构用户就没有这么幸运，他们一般通过拨号网络接入Internet，面对浩瀚的Internet海洋，没有能力找到“虫洞”的入口，只能望洋兴叹。即使拨号网络演进到以太网，也只是解决了本地接入Internet的问题，无法访问总部网络。难道分支机构用户注定与总部网络无缘了吗？

幸好LAC横空出世，帮助分支机构解决了这一难题。一方面，LAC作为PPPoE Server，分支机构用户作为PPPoE Client与LAC建立PPPoE连接，让PPP欢快地跑在以太网上；另一方面，LAC作为LNS的“中介”，为分支机构提供“虫洞”的入口，在分支机构用户看来，通过LAC这扇传送门就可以到达总部网络。

因为在VPDN里LAC还有一个别名叫做NAS，所以这种L2TP VPN也称为NAS-Initiated VPN。可能把NAS-Initiated VPN改为LAC-Initiated VPN大家更习惯一些，因为组网图中明明标的是LAC，却非得叫一个已经搁置不用的“曾用名”，这对于后来者而言确实有点不明所以。

NAS-Initiated VPN的建立过程有点小复杂，为了便于记忆强叔给大家画了一张简图，方便后续对着这张图一一道来。

![](../images/53a0f11376031.png)

为了复习一下PPPoE的相关知识，我们用一台防火墙作为PPPoE Client，模拟PC的PPPoE Client：


![](../images/53a0f12f48687.png)

#### 阶段1 拨号口对VT口的呼唤：建立PPPoE连接
PPP屈尊落户以太网变为PPPoE后，为了在以太网上模拟PPP的拨号过程，PPPoE发明了两个虚拟接口??Dialer接口和VT接口。Dialer接口用于PPPoE Client侧，VT接口用于PPPoE Server（即LAC）侧，在这两个接口上配置PPPoE相关参数。

##### PPPoE Client
```bash
interface dialer 1
dialer user user1
dialer-group 1
dialer bundle 1
ip address ppp-negotiate       //协商模式下实现IP地址动态分配
ppp chap user user1  //PPPoE Client的用户名
ppp chap password cipher Password1   //PPPoE Client的密码
dialer-rule 1 ip permit
interface GigabitEthernet0/0/1
pppoe-client dial-bundle-number 1   //在物理接口上启用PPPoE Client并绑定dial-bundle
```
#### PPPoE Server(LAC)
```bash
interface Virtual-Template 1
ppp authentication-mode chap
interface GigabitEthernet 0/0/1
pppoe-server bind virtual-template 1        //在物理接口上启用PPPoE Server并绑定VT接口

aaa
local-user user1 password Password1
 local-user user1 service-type ppp

注：在L2TP中，用户的IP地址都是由总部（LNS或AAA服务器）统一进行分配的，所以LAC上不需要配置地址池（即使配置了地址池，在L2TP隧道已经建立的情况下，也会优先使用总部的地址池进行地址分配），而普通的PPPoE拨号则必须在PPPoE Server上配置地址池。
```
通过抓包来分析PPPoE连接的建立过程：

![](../images/53a0fda772386.png)

这里重点介绍PPPoE发现阶段的协商过程，PPPoE Client和PPPoE Server之间通过交互PADI、PADO、PADR和PADS报文，确定对方以太网地址和PPPoE会话ID：
#### 步骤一
PPoE Client：广播广播，我想接入PPPoE，谁来帮帮我？

![](../images/53a0f28287ff0.png)

#### 步骤二
	
PPPoE Server：PPPoE Client，找我呀，我可以帮助你！

![](../images/53a0f28c6fff7.png)
#### 步骤三
PPPoE Client：太好了，PPPoE Server，我想跟你建立PPPoE会话。

![](../images/53a0f298b75dd.png)

#### 步骤四
	
PPPoE Server：没问题，我把会话ID发给你，我们就用这个ID建立PPPoE会话吧。

![](../images/53a0f2a20f2ed.png)


### 阶段2 建立L2TP隧道：3条消息协商进入虫洞时机

LAC和LNS通过交互三条消息协商L2TP隧道，这个过程我们在“Client-Initiated VPN”一篇中已经介绍过了，这里再复习一遍。首先来看一下LAC和LNS的具体配置：
#### LAC
```bash
l2tp-group 1
 tunnel authentication   //避免假冒LAC接入LNS
tunnel password cipher Password1
 tunnel name lac
 start l2tp ip 1.1.1.2 fullusername user1      //指定隧道对端地址
l2tp enable
```
#### LNS
```bash
interface Virtual-Template 1
 ppp authentication-mode chap
 ip address 172.16.0.1 255.255.255.0
 remote address pool
l2tp-group 1
 tunnel authentication   //避免假冒LAC接入LNS
 tunnel password cipher Password1
 tunnel name lns
allow l2tp virtual-template 1 remote lac     //允许远端接入
l2tp enable

aaa
 local-user user1 password Password1
 local-user user1 service-type ppp
 ip pool 0 172.16.0.2
```
抓包信息如下

![](../images/53a0f328ea52c.png)

隧道ID协商过程：

#### 步骤一
	
LAC：LNS，使用1作为Tunnel ID跟我通信吧。

![](../images/53a0f393ab1f2.png)

#### 步骤二
LNS：OK。LAC，你也用1作为Tunnel ID跟我通信。

![](../images/53a0f39f19d7d.png)

#### 步骤三
LAC:OK

### 阶段3 建立L2TP会话：3条消息唤醒虫洞门神
LAC和LNS通过交互三条消息协商Session ID，建立L2TP会话。同样，我们再复习一遍这个过程。

Session ID协商过程：
#### 步骤一
LAC：LNS，使用4作为Session ID跟我通信吧。

![](../images/53a0f44a05b0d.png)

#### 步骤二
LNS：OK。LAC，你也使用4作为Session ID跟我通信吧。

![](../images/53a0f454ed887.png)

### 阶段4-5  LNS冷静接受LAC：LNS认证，分配IP地址

1. LNS认证&二次认证（可选）

    LAC将用户信息发给LNS进行验证，但LNS清醒认识到LAC“中介”的本来面目，对此LNS有三种态度：

    - lLAC代理认证：相信LAC是可靠的，直接对LAC发来的用户信息进行验证。

    - 强制CHAP认证：不相信LAC，要求重新对用户进行“资格审查”（强制重新对用户进行CHAP验证）。

    - LCP重协商：不仅不相信LAC，还对
    
    **后两种方式统称为LNS二次认证，若LNS配置二次认证而PPPoE Client不支持二次认证，将会导致L2TP VPN无法建立。** 两种二次认证的共同特征是LNS都绕过了LAC直接验证PPPoE Client提供的用户信息，可以为VPN业务提供了更高的安全保障。 

    #### LAC代理认证 *
    缺省, 不用配置

    ![](../images/53a0f5e99ae24.png)

    LNS直接对LAC发来的用户信息进行验证，验证通过即成功建立PPP连接。
    #### 强制CHAP认证 **
    ```bash
    l2tp-group 1

    mandatory-chap
    ```
    ![](../images/53a0f604f183c.png)

    LNS重新对用户进行CHAP验证，LNS发送挑战，PPPoE Client使用挑战将用户名和加密后的密码发给LNS，LNS验证通过成功建立PPP连接。

    #### LCP重协商 ***
    ```bash
    interface virtual-template 1
    ppp authentication-mode chap   //重协商后的验证方式在VT下指定
    l2tp-group 1
    mandatory-lcp
    ```

    ![](../images/53a0f640da8a1.png)

    *代表优先级，三种方式同时配置时LCP重协商优先级最高。

2. 分配IP地址

    通过PPP IPCP协商，LNS为PPPoE Client分配IP地址。

    ![](../images/53a0f6b77ce53.png)

    ![](../images/53a0f6fcd06e6.png)

    关于地址池地址的规划问题，我们在“Client-Initiated VPN”一篇中也讲过。同样，建议把地址池地址和总部网络地址规划为不同的网段。如果地址池地址和总部网络地址配置为同一网段，则必须在LNS连接总部网络的接口上开启ARP代理功能，并且开启L2TP虚拟转发功能，保证LNS可以对总部网络服务器发出的ARP请求进行应答。

    假设LNS连接总部网络的接口是GigabitEthernet0/0/1，开启ARP代理功能和L2TP虚拟转发功能的配置如下：
    ```bash
    interface GigabitEthernet0/0/1

    ip address 192.168.0.1 255.255.255.0 

    arp-proxy enable             //ARP代理功能

    virtual-l2tpforward enable         //开启L2TP虚拟转发功能
    ```
    总结一下NAS-Initiated VPN的特点：

    NAS-Initiated VPN场景中，一对LAC和LNS的连接可存在多条隧道；一条隧道中可承载多条会话。接入用户1与LNS之间建立PPP连接1和L2TP会话1，接入用户2与LNS之间建立PPP连接2和L2TP会话2。

    ![](../images/53a0f7631e291.png)

    当其中一个用户拨号后，触发LAC和LNS之间建立隧道。只要此用户尚未下线，则其余用户拨号时，会在已有隧道基础上建立会话，而并非重新触发建立隧道

### 阶段6 一路畅通：数据封装传输
PPPoE Client访问总部服务器的报文到达LAC后，LAC为报文穿上三层“马甲”，即L2TP头、UDP头和公网IP头，然后发送到LNS。LNS收到报文后，脱去这三层“马甲”，将报文转发至服务器

![](../images/53a0f7a17e710.png)

报文封装和解封装的过程如下图所示：

![](../images/53a0f7ca237c0.png)

借助于LAC的力量，分支机构员工使用PPPoE Client就可以畅通无阻访问总部网络。但是从总部服务器到PPPoE Client的回程报文是如何进入隧道返回的呢？还记得我们在“Client-Initiated VPN”一篇中介绍过的UNR路由吧，NAS-Initiated VPN也是这样处理的。LNS会为获得IP地址的PPPoE Client自动下发了一条UNR路由，下一跳为PPPoE Client本身的地址，出接口是InLoopBack0，这条路由将指引回程报文进入隧道。回程报文进入隧道后被封装上公网IP地址，然后LNS将会以该公网IP地址为目的地址再次查找路由，将封装后的回程报文送往LAC。

NAS-Initiated VPN场景中，分支机构用户必须拨号才能使用L2TP VPN，报文还要封装成PPPoE，太麻烦了。况且拨号网络逐渐消失，以太网一统江湖，分支机构用户就不能直接在以太网***问总部网络吗？当然可以，人类偷懒的需求才是科技进步的原动力。下期强叔就为大家介绍LAC-Auto-Initiated VPN，由LAC自动拨号到LNS，省去了分支机构员工拨号的过程，堪称最省事的L2TP VPN，敬请期待。

## LAC-Auto-Initiated VPN
LAC-Auto-Initiated VPN也叫做LAC自动拨号VPN，顾名思义，在LAC上配置完成后，LAC会自动向LNS发起拨号，建立L2TP隧道和会话，不需要分支机构用户拨号来触发。对于分支机构用户来说，访问总部网络就跟访问自己所在的分支机构网络一样，完全感觉不到自己是在远程接入。但是这种方式下LNS只对LAC进行认证，分支机构用户只要能连接LAC即可以使用L2TP隧道接入总部，与NAS-Initiated VPN相比安全性要差一些。

LAC-Auto-Initiated VPN的配置也不复杂，以下面这个组网为例：

![](../images/53a25d4316993.png)

LAC和LNS上的配置如下：

#### LAC
```bash
interface Virtual-Template 1
 ppp authentication-mode chap
 ppp chap user lac
 ppp chap password cipher Password1
 ip address ppp-negotiate 
 call-lns local-user lac binding l2tp-group 1   //LAC向LNS发起拨号
l2tp-group 1
 tunnel authentication
tunnel password cipher Password1
 tunnel name lac
 start l2tp ip 1.1.1.2 fullusername lac      //指定隧道对端地址
l2tp enable
ip route-static 192.168.0.0 255.255.255.0 Virtual-Template 1          //配置去往总部网络的静态路由，此处与Client-Initiated VPN以及NAS-Initiated VPN不同，LAC上必须配置该条路由，指引分支机构用户访问总部网络的报文进入L2TP隧道
```

#### LNS
```bash
interface Virtual-Template 1
 ppp authentication-mode chap
 ip address 10.1.1.1 255.255.255.0
 remote address pool 1
l2tp-group 1
tunnel authentication
 tunnel password cipher Password1
 tunnel name lns
allow l2tp virtual-template 1 remote lac     //允许远端接入
l2tp enable
aaa
local-user lac password Password1
  local-user lac service-type ppp
ip pool 1 10.1.1.2
ip route-static 172.16.0.0 255.255.255.0 Virtual-Template 1          //配置去往分支机构网络的静态路由，如果LAC上配置了源NAT，则无需配置该条路由，详细情况后文介绍
```
LAC-Auto-Initiated VPN的建立过程与Client-Initiated VPN类似，只不过在LAC-Auto-Initiated VPN中，LAC取代了Client-Initiated VPN中L2TP Client的角色。

![](../images/53a25dabbc98f.png)

各个阶段的建立过程与Client-Initiated VPN的建立过程大同小异，大家可以温习VPN篇 L2TP Client-Initiated VPN，强叔在这里就不多说了。需要注意的一点是，在阶段3中，LNS只对LAC进行验证，验证通过后为LAC的VT接口分配IP地址，而不是为分支机构用户分配IP地址。虽然LNS不为分支机构分配IP地址，但是并不代表分支机构的IP地址可以随意配置。

为了保证分支机构网络与总部网路之间正常访问，请为分支机构网络和总部网络规划各自独立的私网网段，要求二者的网段地址不能重叠。

总结一下LAC-Auto-Initiated VPN的特点：

LAC-Auto-Initiated VPN场景中，LAC和LNS之间建立一条永久的隧道，且仅承载一条永久的L2TP会话和PPP连接。L2TP会话和PPP连接只存在于LAC和LNS之间。

![](../images/53a25decbaec1.png)

LAC-Auto-Initiated VPN的PPP封装和L2TP封装仅限于LAC和LNS之间的报文交互：

![](../images/53a25dffa968d.png)

另外，还有一个需要重点关注的问题是回程报文如何进入隧道。与Client-Initiated VPN以及NAS-Initiated VPN不同，在LAC-Auto-Initiated VPN中，LNS只下发了一条目的地址为LAC的VT接口地址的UNR路由，并没有去往分支机构网络的路由。对此LNS振振有词：“我只对我分配出去的IP地址负责，所以保证可以到达对端LAC的VT接口。分支机构网络的地址不是我分配的，我甚至都不知道它们的地址是什么，因此只能说抱歉。”

那么如何解决这个问题呢？最简单方法就是在LNS手动配置一条去往分支机构网络的静态路由，指引回程报文进入隧道：
```bash
ip route-static 172.16.0.0 255.255.255.0 Virtual-Template 1
```
除了配置静态路由之外，还有没有其他方法呢？强叔突然灵光一现，还记得我们之前讲过的NAT吧！既然LNS只认他分配的IP地址，那我们就在LAC上配置源NAT功能，把分支机构用户访问总部网络报文的源地址都转换成VT接口的地址，即easy-IP方式的源NAT。LNS收到回程报文后，发现目的地址是LAC的VT接口的IP地址，就会按照UNR路由进入隧道转发，这样就无需在LNS上配置静态路由了。

字不如图，下面强叔就以实际组网为例，介绍一下LAC上配置了源NAT后，分支机构用户访问总部服务器时的报文封装与解封装全过程：

![](../images/53a25e3720f96.png)

1.  LAC收到分支机构用户访问总部服务器的原始报文后，根据目的地址查找路由，命中我们手动配置的静态路由，将报文发送至VT接口。
2.  LAC在VT接口对原始报文进行NAT转换，将源地址转换成VT接口的地址，然后为报文封装PPP头、L2TP头和公网地址。LAC根据公网目的地址查找路由，将封装后的报文发送至LNS。
3.  LNS收到报文后，剥离掉PPP头、L2TP头，根据目的地址查找路由（此处为直连路由），然后将报文发送至总部服务器。
4.  LNS收到总部服务器的回程报文后，根据目的地址查找路由，命中LNS自动下发的UNR路由，将报文发送至VT接口。
5.  报文在VT接口封装PPP头、L2TP头和公网地址，LNS根据公网目的地址查找路由，将封装后的报文发送至LAC。
6.  LAC收到报文后，剥离掉PPP头、L2TP头，将报文的目的地址转换成分支机构用户的地址，然后将报文发送至分支机构用户。

在LAC上配置easy-IP方式源NAT的示例如下（假设在LAC上连接分支机构网络的接口属于Trust区域，VT接口属于Untrust区域）：
```bash
nat-policy interzone trust untrust outbound  
 policy 1    
  action source-nat  
  policy source 172.16.0.0 0.0.0.255
    easy-ip Virtual-Template 1
```

至此，强叔用三期的篇幅介绍了三种L2TP VPN，下面我们再来对这三种L2TP VPN做一下总结：

| 项目           | Client-Initiated VPN                                                              | NAS-Initiated VPN                                                                             | LAC-Auto-Initiated VPN                                                       |
| -------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 协商方式       | L2TP Client和LNS协商建立L2TP隧道和L2TP会话、建立PPP连接                           | 接入用户使用PPPoE拨号触发LAC和LNS之间协商建立L2TP隧道和L2TP会话，接入用户和LNS协商建立PPP连接 | LAC主动拨号，和LNS协商建立L2TP隧道和L2TP会话、建立PPP连接                    |
| 隧道和会话关系 | 每个L2TP Client和LNS之间均建立一条L2TP隧道，每条隧道中仅承载一条L2TP会话和PPP连接 | LAC和LNS的连接可存在多条L2TP隧道，一条L2TP隧道中可承载多条L2TP会话                            | LAC和LNS之间建立一条永久的L2TP隧道，且仅承载一条永久的L2TP会话和PPP连接      |
| 安全性         | LNS对L2TP Client进行PPP认证（PAP或CHAP），安全性较高                              | LAC对接入用户进行认证，LNS对接入用户进行二次认证（可选），安全性最高                          | LAC不对用户进行认证，LNS对LAC配置的用户进行PPP认证（PAP或CHAP），安全性低    |
| 回程路由配置   | LNS上会自动下发UNR路由，指导回程报文进入L2TP隧道，无需手动配置                    | LNS上会自动下发UNR路由，指导回程报文进入L2TP隧道，无需手动配置                                | LNS上需要手动配置目的地址为网段的静态路由，或者在LAC上配置easy-IP方式的源NAT |



## IPSec
作为新一代的VPN技术，IPSec可以在Internet上建立安全稳定的专用线路。与GRE和L2TP相比，IPSec更加安全，能够保证总舵与分舵之间消息的安全传输。

### 两大绝技
要说这IPSec可不简单，它不是一个单一的招式，而是一整套招法。IPSec巧妙借用了密码学门派所擅长的易容障眼之法，融会到自创的AH（Authentication Header，验证头）和ESP（Encapsulating Security Payload，封装安全载荷）两大绝技中，既可改头换面瞒天过海，也能验明正身完璧归赵。即便消息被截获了也没人能看懂，被篡改了也能及时发现。

#### 一: 加密
IPSec借用了易容术的巧妙之处，一方传递消息之前，先使用加密算法和加密密钥，将消息改头换面，该过程称为加密；另一方收到消息后，使用相同的加密算法和加密密钥，逆向将消息恢复为真实面貌，该过程称为解密。而消息在传递过程中绝不以真容示人，令窃密者一无所获。

![](../images/53b25bb5f2b59.png)

总舵和分舵使用相同的密钥来加密和解密，这种方式也叫对称加密算法，主要包括DES、3DES和AES

| 项目     | DES                      | 3DES                            | AES                          |
| -------- | ------------------------ | ------------------------------- | ---------------------------- |
| 全称     | Data Encryption Standard | Triple Data Encryption Standard | Advanced Encryption Standard |
| 密钥长度 | 56位                     | 168位                           | 128位、192位、256位          |
| 安全级别 | 低                       | 中                              | 高                           |

#### 二: 验证
一方传递消息之前，先使用验证算法和验证密钥对消息进行处理，得到签字画押的文书，即签名。然后将签名随消息一同发出去。另一方收到消息后，也使用相同的验证算法和验证密钥对消息进行处理，同样得到签名，然后比对两端的签名，如果相同则证明该消息没有被篡改。

![](../images/53b25bcd4fccd.png)

除了对消息的完整性进行验证，IPSec还可以对消息的来源进行验证，即验明消息的正身，保证消息来自真实的发送者。

通常情况下，验证和加密配合使用，加密后的报文经过验证算法处理生成签名。常用的验证算法有MD5和SHA系列。
| 项目     | MD5              | SHA1                    | SHA2                                                      |
| -------- | ---------------- | ----------------------- | --------------------------------------------------------- |
| 全称     | Message Degest 5 | Secure Hash Algorithm 1 | Secure Hash Algorithm 2                                   |
| 签名长度 | 128位            | 160位                   | SHA2-256:256位<br/>SHA2-384:384位<br/>SHA2-512:512位<br/> |


IPSec的两大绝技中，AH只能用来验证，没有加密的功能，而ESP同时具有加密和验证的功能，AH和ESP可以单独使用也可以配合使用。

### 安全封装
IPSec设计了两种封装模式：

#### 隧道模式
在隧道模式下，AH头或ESP头到原始IP头之前，另外生成一个新的报文头放到AH头或ESP头之前：

![](../images/53b25be0e914b.png)

隧道模式使用新的报文头来封装消息，可以保护一个网络的消息，适用于两个网关之间通信，是比较常用的封装模式。总舵和分舵内部私网之间的信息经过加密和封装处理后，在外看来只是总舵和分舵的公开身份（公网地址），即当铺和票号之间的通信，不会被人怀疑。

#### 传输模式
在传输模式中，AH头或ESP头入到IP头与传输层协议头之间：

![](../images/53b25bf031243.png)

传输模式不改变报文头，隧道的源和目的地址就是最终通信双方的源和目的地址，通信双方只能保护自己发出的消息，不能保护一个网络的消息。所以该模式只适用于两台主机之间通信，不适用于天地会总舵和分舵内部私网之间通信。

### 互信盟友
IPSec中通信双方建立的连接叫做安全联盟SA（Security Association），顾名思义，通信双方结成盟友，使用相同的封装模式、加密算法、加密密钥、验证算法、验证密钥，相互信任亲密无间。

安全联盟是单向的逻辑连接，为了使每个方向都得到保护，总舵和分舵的每个方向上都要建立安全联盟。总舵入方向上的安全联盟对应分舵出方向上的安全联盟，总舵出方向上的安全联盟对应分舵入方向上的安全联盟。

![](../images/53b25bffbeacf.png)

为了区分这些不同方向的安全联盟，IPSec为每一个安全联盟都打上了唯一的标识符，这个标识符叫做SPI（Security Parameter Index）。

建立安全联盟最直接的方式就是分别在总舵和分舵上人为设定好封装模式、加密算法、加密密钥、验证算法、验证密钥，即手工方式建立IPSec安全联盟。

#### 初显神威
了解到IPSec的强大威力后，天地会陈总舵主决定先在总舵和一个分舵之间使用手工方式部署IPSec隧道，对总舵和分舵内部网络之间传递的消息进行保护，验证IPSec隧道的安全效果。

![](../images/53b25c10582bf.png)
为了让加密、验证、安全联盟的配置关系更清晰，IPSec为手工方式定义了四个步骤：
1.  定义需要保护的数据流
    
    只有总舵和分舵内部网络之间交互的消息才被IPSec保护，其他消息不受保护。

2.  配置IPSec安全提议

    总舵和分舵根据对方的提议，决定能否成为盟友。封装模式、ESP、加密算法和验证算法均在安全提议中设置。

3.  配置手工方式的IPSec安全策略

    指定总舵和分舵的公网地址、安全联盟标识符SPI，以及加密密钥和验证密钥。

4.  应用IPSec安全策略

手工方式的IPSec配置关系如下图所示：

![](../images/53b25c2bee558.png)

天地会总舵和分舵的关键配置和解释如下：

配置项|天地会总舵|天地会分舵
--|--|--
ACL|**acl number 3000**<br/> rule 5 permit ip source 192.168.0.0 0.0.0.255 destination 172.16.0.0 0.0.0.255|**acl number 3000**<br/> rule 5 permit ip source 172.16.0.0 0.0.0.255 destination 192.168.0.0 0.0.0.255
**IPSec安全提议**|  **ipsec proposal pro1**<br/> transform esp<br/> encapsulation-mode tunnel<br/> esp authentication-algorithm sha1<br/> esp encryption-algorithm aes |**ipsec proposal pro1** <br/>transform esp <br/> encapsulation-mode tunnel <br/>esp authentication-algorithm sha1 <br/> esp encryption-algorithm aes
**IPSec安全策略**|**ipsec policy policy1 1 manual**<br/> security acl 3000<br/> proposal pro1<br/> tunnel local 1.1.1.1<br/> tunnel remote 2.2.2.2<br/> sa spi inbound esp 54321<br/>sa spi outbound esp 12345<br/> sa string-key inbound esp huawei@123<br/> sa string-key outbound esp huawei@456<br/>|**ipsec policy policy1 1 manual**<br/> security acl 3000<br/> proposal pro1<br/> tunnel local 2.2.2.2<br/> tunnel remote 1.1.1.1<br/> sa spi inbound esp 12345<br/>sa spi outbound esp 54321<br/> sa string-key inbound esp huawei@456<br/> sa string-key outbound esp huawei@123<br/>
**应用IPSec安全策略**|**interface GigabitEthernet0/0/1**<br/> ip address 1.1.1.1 255.255.255.0<br/> ipsec policy policy1|**interface GigabitEthernet0/0/0**<br/>ip address 2.2.2.2 255.255.255.0<br/> ipsec policy policy1


注：除了上述IPSec的配置之外，防火墙安全策略也需要配置，允许总舵和分舵之间建立安全联盟，以及允许总舵私网和分舵私网之间互访。

部署完成后，总舵内部网络向分舵内部网络发出ping消息，分舵内部网络回复ping消息，天地会在Internet上模拟官府设卡检查，发现两个方向的ping消息都已经被IPSec安全联盟保护。两个方向上IPSec安全联盟的标识符SPI分别为0x3039（十进制12345）以及0xd431（十进制54321），与上文配置相符。

![](../images/53b25c3e7d303.png)

分析报文的内容，发现ping消息已经被加密，面目全非无法辨识，这样即使该消息真的被官府查获，也不能获取到任何有价值的信息。

为了对比ESP和AH的作用，天地会又使用IPSec中的另一绝技AH来建立安全联盟。AH只有验证功能，没有加密的功能，官府从查获到的消息中看到私网报文头和ping消息真容。因此，**如果要实现加密，还是要使用ESP，或者AH和ESP配合使用**

![](../images/53b25c57dcae8.png)

## IPSec携手IKE 
### 密钥管家IKE登场
上回说到手工方式的IPSec VPN帮助天地会解决了总舵和分舵之间秘密通信的问题，但随着分舵数量的增加新的问题又出现了。手工方式下防火墙的加密和验证所使用的密钥都是手工配置的，为了保证IPSec VPN的长期安全，需要经常修改这些密钥。分舵数量越多，密钥的配置和修改工作量越大。随着天地会的壮大，IPSec VPN的维护管理工作越来越让人吃不消了。
为了降低IPSec VPN管理工作量，天地会总舵主再访高人寻求灵丹妙药。灵丹已练，妙药天成――原来IPSec协议框架中早就考虑了这个问题――智能的密钥管家IKE（Internet Key Exchange）协议可以帮助解决这个问题。IKE综合了三大协议：ISAKMP（Internet Security Association and Key Management Protocol）、Oakley协议和SKEME协议。ISAKMP主要定义了IKE伙伴（IKE Peer）之间合作关系（IKE SA，跟IPSec SA类似）的建立过程。Oakley协议和SKEME协议的核心是DH（Diffie-Hellman）算法，主要用于在Internet上安全地分发密钥、验证身份，以保证数据传输的安全性。有了IKE加盟，IPSec VPN的安全和管理问题不再困扰天地会，各地分舵申请建立VPN的流程终于可以进入“实施”状态了。

### 揭开ISAKMP本来面目
IKE协议的终极目标是通过协商在总舵和分舵之间动态建立IPSec SA，并能够实时维护IPSec SA。为建立IPSec SA而进行的IKE协商工作是由ISAKMP报文来完成的，所以在部署IKE之前，强叔先领大家认识一下ISAKMP报文。ISAKMP报文封装如下：

![](../images/53be0f3d1a7b4.png)

####  IP报文头

- 源地址src：本端发起IKE协商的IP地址，可能是接口IP地址，也可能是通过命令配置的IP地址。
- 目的IP地址Dst：对端发起IKE协商的IP地址，由命令配置。

#### UDP报文头
IKE协议使用端口号500发起协商、响应协商。在总舵和分舵都有固定IP地址时，这个端口在协商过程中保持不变。当总舵和分舵之间有NAT设备时（NAT穿越场景），IKE协议会有特殊处理（后续揭秘）
#### ISAKMP报文头
- Initiator’s Cookie（SPI）和responder’s Cookie（SPI）：在IKEv1版本中为Cookie，在IKEv2版本中Cookie为IKE的SPI，唯一标识一个IKE SA。
- Version：IKE版本号1。
- Exchange Type：IKE定义的交互类型2。交换类型定义了ISAKMP消息遵循的交换顺序。
- Next Payload：标识消息中下一个载荷的类型。一个ISAKMP报文中可能装载多个载荷，该字段提供载荷之间的“链接”能力。若当前载荷是消息中最后一个载荷，则该字段为0。
- Type Payload：载荷类型，ISAKMP报文携带的用于协商IKE SA和IPSec SA的“参数包”。载荷类型有很多种，不同载荷携带的“参数包”不同。不同载荷的具体作用我们后面会结合抓包过程逐一分析。

说明：
1.IKE诞生以来，有过一次大的改进。老的IKE被称为IKEv1，改进后的IKE被称为IKEv2。二者可以看做是父子关系，血脉相承，基本功能不变；但青胜于蓝，后者有了长足的进步。
2. IKEv1版本中可以在交换类型字段查看协商模式，阶段1分为两种模式：主模式和野蛮模式，阶段2采用快速模式。主模式是主流技术，野蛮模式是为解决现实问题而产生的。IKEv2版本中定义了查看创建IKE SA和CHILD SA（对应IKEv1的IPSec SA）的IKE_SA_INIT、IKE_AUTH（创建第一对CHILD SA）、CREATE_CHILD_SA（创建后续的CHILD SA）。

IKEv1和IKEv2的精华之处正是本文的重点，各位看官莫急，容强叔一一道来。

### IKEv1小试牛刀
IKE最适合于在总舵和众多分舵之间建立IPSec VPN的场景，分舵越多IKE的优势越能凸显。为了讲解方便，这里仅给出总舵和一个分舵之间建立IPSec VPN的组网图。

![](../images/53be0f5fce319.png)

相比手工方式，IKE方式仅增加了两步：配置IKE安全提议和IKE对等体。IKE安全提议主要用于配置建立IKE SA用到的加密和验证算法。IKE对等体主要配置IKE版本、身份认证和交换模式。

![](../images/53be0f804c7e7.png)