# 6.1 GitHub - 账户的创建和配置
GitHub 是最大的 Git 版本库托管商，是成千上万的开发者和项目能够合作进行的中心。 大部分 Git 版本库都托管在 GitHub，很多开源项目使用 GitHub 实现 Git 托管、问题追踪、代码审查以及其它事情。 所以，尽管这不是 Git 开源项目的直接部分，但如果想要专业地使用 Git，你将不可避免地与 GitHub 打交道，所以这依然是一个绝好的学习机会。

本章将讨论如何高效地使用 GitHub。 我们将学习如何注册和管理账户、创建和使用 Git 版本库、向已有项目贡献的通用流程以及如何接受别人向你自己项目的贡献、GitHub 的编程接口和很多能够让这些操作更简单的小提示。

如果你对如何使用 GitHub 托管自己的项目，或者与已经托管在 GitHub 上面的项目进行合作没有兴趣，可以直接跳到 [Git 工具](https://git-scm.com/book/zh/v2/GitHub-%E8%B4%A6%E6%88%B7%E7%9A%84%E5%88%9B%E5%BB%BA%E5%92%8C%E9%85%8D%E7%BD%AE#ch07-git-tools) 这一章。

## 账户的创建和配置
你所需要做的第一件事是创建一个免费账户。 直接访问 https://github.com，选择一个未被占用的用户名，提供一个电子邮件地址和密码，点击写着“Sign up for GitHub”的绿色大按钮即可。

![](./images/signup.png)

你将看到的下一个页面是升级计划的价格页面，目前我们可以直接忽略这个页面。 GitHub 会给你提供的邮件地址发送一封验证邮件。 尽快到你的邮箱进行验证，这是非常重要的（我们会在后面了解到这点）。

>**Note**: GitHub 为免费账户提供了几乎所有的功能，除了一些高级的特性。GitHub 的付费计划包含一些高级工具和功能，不过本书将不涉及这部分内容。 关于可选方案及其对比的更多信息见 https://github.com/pricing。

点击屏幕左上角的 Octocat 图标，你将来到控制面板页面。 现在，你已经做好了使用 GitHub 的准备工作。

### SSH 访问
现在，你完全可以使用 `https://` 协议，通过你刚刚创建的用户名和密码访问 Git 版本库。 但是，如果仅仅克隆公有项目，你甚至不需要注册——刚刚我们创建的账户是为了以后 fork 其它项目，以及推送我们自己的修改。

如果你习惯使用 SSH 远程，你需要配置一个公钥。 （如果你没有公钥，参考 生成 SSH 公钥。） 使用窗口右上角的链接打开你的账户设置：

![](./images/account-settings.png)

然后在左侧选择“SSH keys”部分。

![](./images/ssh-keys.png)

在这个页面点击`“Add an SSH key”`按钮，给你的公钥起一个名字，将你的 `~/.ssh/id_rsa.pub` （或者自定义的其它名字）公钥文件的内容粘贴到文本区，然后点击“Add key”。

>**Note**: 确保给你的 SSH 密钥起一个能够记得住的名字。 你可以为每一个密钥起名字（例如，“我的笔记本电脑”或者“工作账户”等），以便以后需要吊销密钥时能够方便地区分。

### 头像
下一步，如果愿意的话，你可以将生成的头像换成你喜欢的图片。 首先，来到“Profile”标签页（在“SSH Keys”标签页上方），点击“Upload new picture”。

![](./images/your-profile.png)

我们选择了本地磁盘上的一个 Git 图标，上传之后还可以对其进行裁剪。

![](./images/avatar-crop.png)

现在，在网站任意有你参与的位置，人们都可以在你的用户名旁边看到你的头像。

如果你已经把头像上传到了流行的 Gravatar 托管服务（Wordpress 账户经常使用），默认就会使用这个头像，因此，你就不需要进行这一步骤了。

## 邮件地址
GitHub 使用用户邮件地址区分 Git 提交。 如果你在自己的提交中使用了多个邮件地址，希望 GitHub 可以正确地将它们连接起来， 你需要在管理页面的 Emails 部分添加你拥有的所有邮箱地址。

![](./images/email-settings.png)

在 [添加邮件地址](https://git-scm.com/book/zh/v2/ch00/_add_email_addresses) 中我们可以看到一些不同的状态。 顶部的地址是通过验证的，并且被设置为主要地址，这意味着该地址会接收到所有的通知和回复。 第二个地址是通过验证的，如果愿意的话，可以将其设置为主要地址。 最后一个地址是未通过验证的，这意味着你不能将其设置为主要地址。 当 GitHub 发现任意版本库中的任意提交信息包含了这些地址，它就会将其链接到你的账户。

### 两步验证
最后，为了额外的安全性，你绝对应当设置两步验证，简写为 “2FA”。 两步验证是一种用于降低因你的密码被盗而带来的账户风险的验证机制，现在已经变得越来越流行。 开启两步验证，GitHub 会要求你用两种不同的验证方法，这样，即使其中一个被攻破，攻击者也不能访问你的账户。

你可以在 Account settings 页面的 Security 标签页中找到 Two-factor Authentication 设置。

![](./images/2fa-1.png)

点击“Set up two-factor authentication”按钮，会跳转到设置页面。该页面允许你选择是要在登录时使用手机 app 生成辅助码（一种“基于时间的一次性密码”），还是要 GitHub 通过 SMS 发送辅助码。

选择合适的方法后，按照提示步骤设置 2FA，你的账户会变得更安全，每次登录 GitHub 时都需要提供除密码以外的辅助码。

# 6.2 GitHub - 对项目做出贡献
## 对项目做出贡献
账户已经建立好了，现在我们来了解一些能帮助你对现有的项目做出贡献的知识。
### 派生项目
如果你想要参与某个项目，但是并没有推送权限，这时可以对这个项目进行“派生（Fork）”。 当你“派生”一个项目时，GitHub 会在你的空间中创建一个完全属于你的项目副本，且你对其具有推送权限。

>**Note**: 在以前，“fork”是一个贬义词，指的是某个人使开源项目向不同的方向发展，或者创建一个竞争项目，使得原项目的贡献者分裂。 在 GitHub，“fork”指的是你自己的空间中创建的项目副本，这个副本允许你以一种更开放的方式对其进行修改。

通过这种方式，项目的管理者不再需要忙着把用户添加到贡献者列表并给予他们推送权限。 人们可以派生这个项目，将修改推送到派生出的项目副本中，并通过创建拉取请求（Pull Request，简称 PR）来让他们的改动进入源版本库，下文我们会详细说明。 创建了拉取请求后，就会开启一个可供审查代码的板块，项目的拥有者和贡献者可以在此讨论相关修改，直到项目拥有者对其感到满意，并且认为这些修改可以被合并到版本库。

你可以通过点击项目页面右上角的“Fork”按钮，来派生这个项目。

![](./images/forkbutton.png)

稍等片刻，你将被转到新项目页面，该项目包含可写的代码副本。

### GitHub 流程
GitHub 设计了一个以拉取请求为中心的特殊合作流程。 它基于我们在 [主题分支](https://git-scm.com/book/zh/v2/ch00/_topic_branch) 的 [Git 分支](https://git-scm.com/book/zh/v2/ch00/ch03-git-branching) 中提到的工作流程。 不管你是在一个紧密的团队中使用单独的版本库，或者使用许多的“Fork”来为一个由陌生人组成的国际企业或网络做出贡献，这种合作流程都能应付。

流程通常如下：

1. 派生一个项目
2. 从 `master` 分支创建一个新分支
3. 提交一些修改来改进项目
4. 将这个分支推送到 `GitHub` 上
5. 创建一个拉取请求
6. 讨论，根据实际情况继续修改
7. 项目的拥有者合并或关闭你的拉取请求
8. 将更新后的 `master` 分支同步到你的派生中

这基本和 [集成管理者工作流](https://git-scm.com/book/zh/v2/ch00/_integration_manager) 中的一体化管理流程差不多，但是团队可以使用 GitHub 提供的网页工具替代电子邮件来交流和审查修改。

现在我们来看一个使用这个流程的例子。

### 创建拉取请求
Tony 在找一些能在他的 Arduino 微控制器上运行的代码，他觉得 https://github.com/schacon/blink 中的代码不错。

![](./images/blink-01-start.png)

但是有个问题，这个代码中的的闪烁频率太高，我们觉得 3 秒一次比 1 秒一次更好一些。 所以让我们来改进这个程序，并将修改后的代码提交给这个项目。

首先，单击“Fork”按钮来获得这个项目的副本。 我们使用的用户名是“tonychacon”，所以这个项目副本的访问地址是： `https://github.com/tonychacon/blink` 。 我们将它克隆到本地，创建一个分支，修改代码，最后再将改动推送到 GitHub。
```bash
$ git clone https://github.com/tonychacon/blink (1)
Cloning into 'blink'...

$ cd blink
$ git checkout -b slow-blink (2)
Switched to a new branch 'slow-blink'

$ sed -i '' 's/1000/3000/' blink.ino (macOS) (3)
# If you're on a Linux system, do this instead:
# $ sed -i 's/1000/3000/' blink.ino (3)

$ git diff --word-diff (4)
diff --git a/blink.ino b/blink.ino
index 15b9911..a6cc5a5 100644
--- a/blink.ino
+++ b/blink.ino
@@ -18,7 +18,7 @@ void setup() {
// the loop routine runs over and over again forever:
void loop() {
  digitalWrite(led, HIGH);   // turn the LED on (HIGH is the voltage level)
  [-delay(1000);-]{+delay(3000);+}               // wait for a second
  digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW
  [-delay(1000);-]{+delay(3000);+}               // wait for a second
}

$ git commit -a -m 'three seconds is better' (5)
[slow-blink 5ca509d] three seconds is better
 1 file changed, 2 insertions(+), 2 deletions(-)

$ git push origin slow-blink (6)
Username for 'https://github.com': tonychacon
Password for 'https://tonychacon@github.com':
Counting objects: 5, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 340 bytes | 0 bytes/s, done.
Total 3 (delta 1), reused 0 (delta 0)
To https://github.com/tonychacon/blink
 * [new branch]      slow-blink -> slow-blink
```
1. 将派生出的副本克隆到本地
2. 创建出名称有意义的分支
3. 修改代码
4. 检查改动
5. 将改动提交到分支中
6. 将新分支推送到 GitHub 的副本中

现在到 GitHub 上查看之前的项目副本，可以看到 GitHub 提示我们有新的分支， 并且显示了一个大大的绿色按钮让我们可以检查我们的改动，并给源项目创建拉取请求。

你也可以到“Branches”（分支）页面查看分支并创建拉取请求： `https://github.com/<用户名>/<项目名>/branches`

![](./images/blink-02-pr.png)

如果我们点击那个绿色按钮，就会跳到一个新页面，在这里我们可以为拉取请求填写标题和描述。 花点时间编写一个清晰有用的描述是非常值得的，这能让原项目拥有者明白你做了什么， 为什么这个改动是正确的，以及接受此更改是否能够改进他的项目。

同时我们也能看到比主分支中所“领先”（ahead）的提交（在这个例子中只有一个）以及所有将会被合并的改动与之前代码的对比。

![](./images/blink-03-pull-request-open.png)

当你单击了“Create pull request”（创建拉取请求）的按钮后，这个项目的拥有者将会收到一条包含关改动和拉取请求页面的链接的提醒。

>**Note**: 虽然拉取请求通常是在贡献者准备好在公开项目中提交改动的时候提交，但是也常被用在仍处于开发阶段的内部项目中。 因为拉取请求在提交后 **依然可以加入新的改动** ，它也经常被用来建立团队合作的环境，而不只是在最终阶段使用。

### 利用拉取请求
现在，项目的拥有者可以看到你的改动并合并它，拒绝它或是发表评论。 在这里我们就当作他喜欢这个点子，但是他想要让灯熄灭的时间比点亮的时间稍长一些。

接下来可能会通过电子邮件进行互动，就像我们在 [分布式 Git](https://git-scm.com/book/zh/v2/ch00/ch05-distributed-git) 中提到的工作流程那样，但是在 GitHub，这些都在线上完成。 项目的拥有者可以审查修改，只需要单击某一行，就可以对其发表评论。


![](./images/blink-04-pr-comment.png)

当维护者发表评论后，提交拉取请求的人，以及所有正在关注（Watching）这个版本库的用户都会收到通知。 我们待会儿将会告诉你如何修改这项设置。现在，如果 Tony 有开启电子邮件提醒，他将会收到这样的一封邮件：

![](./images/blink-04-email.png)

每个人都能在拉取请求中发表评论。在 [拉取请求讨论页面](https://git-scm.com/book/zh/v2/ch00/_pr_discussion) 里我们可以看到项目拥有者对某行代码发表评论， 并在讨论区留下了一个普通评论。你可以看到被评论的代码也会在互动中显示出来。

![](./images/blink-05-general-comment.png)

现在贡献者可以看到如何做才能让他们的改动被接受。幸运的是，这也是一件轻松的事情。 如果你使用的是电子邮件进行交流，你需要再次对代码进行修改并重新提交至邮件列表， 这些修改会自动更新到拉取请求上。在 [最终的拉取请求](https://git-scm.com/book/zh/v2/ch00/_pr_final) 中，你也可以在更新后的拉取请求中看到已折叠的旧代码评论， 因为它是在修改后的行上添加的评论。

对现有的拉取请求添加提交并不会触发提醒，因此 Tony 在推送了他的修正后， 还需要通过评论告知项目拥有者他完成了修改请求。

![](./images/blink-06-final.png)

如果你点开拉取请求的“Files Changed”（更改的文件）选项卡，你将会看到“整理过的”差异表 —— 也就是这个分支被合并到主分支之后将会产生的所有改动， 其实就是 `git diff master...<分支名>` 命令的执行结果。 你可以浏览 [确定引入了哪些东西](https://git-scm.com/book/zh/v2/ch00/_what_is_introduced) 来了解更多关于差异表的知识。

你还会注意到，GitHub 会检查你的拉取请求是否能直接合并，如果可以，将会提供一个按钮来进行合并操作。 这个按钮只在你对版本库有写入权限并且可以进行简洁合并时才会显示。 你点击后 GitHub 将做出一个“非快进式”（non-fast-forward）合并， 即使这个合并 **能够** 快进式（fast-forward）合并，GitHub 依然会创建一个合并提交。

如果你需要，你还可以将分支拉取并在本地合并。 如果你将这个分支合并到 `master` 分支中并推送到 GitHub，这个拉取请求会被自动关闭。

这就是大部分 GitHub 项目使用的工作流程。创建分支，基于分支创建拉取请求，进行讨论， 根据需要继续在分支上进行修改，最终关闭或合并拉取请求。

>**Note**: **不必总是 Fork** 有件很重要的事情：你可以在同一个版本库中不同的分支提交拉取请求。 如果你正在和某人实现某个功能，而且你对项目有写权限，你可以推送分支到版本库， 并在 master 分支提交一个拉取请求并在此进行代码审查和讨论的操作。不需要进行“Fork”

### 拉取请求的进阶用法
目前，我们学到了如何在 GitHub 平台对一个项目进行最基础的贡献。现在我们会教给你一些小技巧，让你可以更加有效率地使用拉取请求。

### 将拉取请求制作成补丁
有一件重要的事情：许多项目并不认为拉取请求可以作为补丁， 就和通过邮件列表工作的的项目对补丁贡献的看法一样。 大多数的 GitHub 项目将拉取请求的分支当作对改动的交流方式，并将变更集合起来统一进行合并。

这是个重要的差异，因为一般来说改动会在代码完成前提出，这和基于邮件列表的补丁贡献有着天差地别。 这使得维护者们可以更早的沟通，由社区中的力量能提出更好的方案。 当有人从拉取请求提交了一些代码，并且维护者和社区提出了一些意见，这个补丁系列并不需要从头来过， 只需要将改动重新提交并推送到分支中，这使得讨论的背景和过程可以齐头并进。

举个例子，你可以回去看看 [最终的拉取请求](https://git-scm.com/book/zh/v2/ch00/_pr_final)，你会注意到贡献者没有变基他的提交再提交一个新的拉取请求， 而是直接增加了新的提交并推送到已有的分支中。 如果你之后再回去查看这个拉取请求，你可以轻松地找到这个修改的原因。 点击网页上的“Merge”（合并）按钮后，会建立一个合并提交并指向这个拉取请求，你就可以很轻松的研究原来的讨论内容。
### 与上游保持同步
如果你的拉取请求由于过时或其他原因不能干净地合并，你需要进行修复才能让维护者对其进行合并。 GitHub 会对每个提交进行测试，让你知道你的拉取请求能否简洁的合并。

![](./images/pr-01-fail.png)

如果你看到了像 [不能进行干净合并](https://git-scm.com/book/zh/v2/ch00/_pr_fail) 中的画面，你就需要修复你的分支让这个提示变成绿色，这样维护者就不需要再做额外的工作。

你有两种方法来解决这个问题。你可以把你的分支变基到目标分支中去 （通常是你派生出的版本库中的 `master` 分支），或者你可以合并目标分支到你的分支中去。

GitHub 上的大多数的开发者会使用后一种方法，基于我们在上一节提到的理由： 我们最看重的是历史记录和最后的合并，变基除了给你带来看上去简洁的历史记录， 只会让你的工作变得更加困难且更容易犯错。

如果你想要合并目标分支来让你的拉取请求变得可合并，你需要将源版本库添加为一个新的远端，并从远端抓取内容，合并主分支的内容到你的分支中去，修复所有的问题并最终重新推送回你提交拉取请求使用的分支。

在这个例子中，我们再次使用之前的“tonychacon”用户来进行示范，源作者提交了一个改动， 使得拉取请求和它产生了冲突。现在来看我们解决这个问题的步骤。
```bash
$ git remote add upstream https://github.com/schacon/blink (1)

$ git fetch upstream (2)
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (3/3), done.
Unpacking objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0)
From https://github.com/schacon/blink
 * [new branch]      master     -> upstream/master

$ git merge upstream/master (3)
Auto-merging blink.ino
CONFLICT (content): Merge conflict in blink.ino
Automatic merge failed; fix conflicts and then commit the result.

$ vim blink.ino (4)
$ git add blink.ino
$ git commit
[slow-blink 3c8d735] Merge remote-tracking branch 'upstream/master' \
    into slower-blink

$ git push origin slow-blink (5)
Counting objects: 6, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 682 bytes | 0 bytes/s, done.
Total 6 (delta 2), reused 0 (delta 0)
To https://github.com/tonychacon/blink
   ef4725c..3c8d735  slower-blink -> slow-blink
```

1. 将源版本库添加为一个远端，并命名为“upstream”（上游）
2. 从远端抓取最新的内容
3. 将该仓库的主分支的内容合并到你的分支中
4. 修复产生的冲突
5. 再推送回同一个分支


你完成了上面的步骤后，拉取请求将会自动更新并重新检查是否能干净的合并。

![](./images/pr-02-merge-fix.png)

Git 的伟大之处就是你可以一直重复以上操作。如果你有一个运行了十分久的项目， 你可以轻松地合并目标分支且只需要处理最近的一次冲突，这使得管理流程更加容易。

如果你一定想对分支做变基并进行清理，你可以这么做，但是强烈建议你不要强行地提交到已经提交了拉取请求的分支。 如果其他人拉取了这个分支并进行一些修改，你将会遇到 [变基的风险](https://git-scm.com/book/zh/v2/ch00/_rebase_peril) 中提到的问题。 相对的，将变基后的分支推送到 GitHub 上的一个新分支中，并且创建一个全新的拉取请求引用旧的拉取请求，然后关闭旧的拉取请求。

### 参考
你的下个问题可能是“我该如何引用旧的拉取请求？”。 有许多方法可以让你在 GitHub 上的几乎任何地方引用其他东西。

先从如何对拉取请求或议题（Issue）进行相互引用开始。所有的拉取请求和议题在项目中都会有一个独一无二的编号。 举个例子，你无法同时拥有 3 号拉取请求和 3 号议题。如果你想要引用任何一个拉取请求或议题， 你只需要在提交或描述中输入 `#<编号>` 即可。 你也可以指定引用其他版本库的议题或拉取请求，如果你想要引用其他人对该版本库的“Fork”中的议题或拉取请求， 输入 `用户名#<编号>` ，如果在不同的版本库中，输入 `用户名/版本库名#<编号>` 。

我们来看一个例子。假设我们对上个例子中的分支进行了变基，并为此创建一个新的拉取请求， 现在我们希望能在新的拉取请求中引用旧的拉取请求。 我们同时希望引用一个派生出的项目中的议题和一个完全不同的项目中的议题， 就可以像 [在拉取请求中的交叉引用](https://git-scm.com/book/zh/v2/ch00/_pr_references) 这样填写描述。

![](./images/mentions-01-syntax.png)

当我们提交了这个拉取请求，我们将会看到以上内容被渲染成这样：[在拉取请求中渲染后的交叉引用](https://git-scm.com/book/zh/v2/ch00/_pr_references_render)

![](./images/mentions-02-render.png)

你会注意到完整的 GitHub 地址被简化了，只留下了必要的信息。

如果 Tony 回去关闭了源拉取请求，我们可以看到一个被引用的提示， GitHub 会自动的反向追踪事件并显示在拉取请求的时间轴上。 这意味着任何查看这个拉取请求的人可以轻松地访问新的拉取请求。 这个链接就像 [在拉取请求中渲染后的交叉引用](https://git-scm.com/book/zh/v2/ch00/_pr_closed) 中展示的那样。

![](./images/mentions-03-closed.png)

除了议题编号外，你还可以通过使用提交的 SHA-1 来引用提交。 你必须完整的写出 40 位长的 SHA-1，GitHub 会在评论中自动地产生指向这个提交的链接。 同样的，你可以像引用议题一样对派生的项目中的提交或者其他项目中的提交进行引用。
### GitHub 风格的 Markdown
对于在 GitHub 中绝大多数文本框中能够做到的事，引用其他议题只是个开始。 在议题和拉取请求的描述，评论和代码评论还有其他地方，都可以使用“GitHub 风格的 Markdown”。 Markdown 可以让你输入纯文本，但是渲染出丰富的内容。

查看 [一个 Markdown 的示例和渲染效果](https://git-scm.com/book/zh/v2/ch00/_example_markdown) 里的示例来了解如何书写评论或文本，并通过 Markdown 进行渲染。

![](./images/markdown-01-example.png)

### GitHub 风格的 Markdown
GitHub 风格的 Markdown 增加了一些基础的 Markdown 中做不到的东西。 它在创建拉取请求和议题中的评论和描述时十分有用。

任务列表
第一个 GitHub 专属的 Markdown 功能，特别是用在拉取请求中，就是任务列表。 一个任务列表可以展示出一系列你想要完成的事情，并带有复选框。 把它们放在议题或拉取请求中时，通常可以展示你想要完成的事情。

你可以这样创建一个任务列表： 