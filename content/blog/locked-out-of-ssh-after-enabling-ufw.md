---
layout: post
title: Locked out of SSH after enabling UFW on Ubuntu EC2 instance?
date: "2021-06-03T00:00:00Z"
created: Jun 3, 2021
group: blog
aliases: 
  - "/blog/"
toc: true
keywords: blog
---
The solution is to stop the instance and instruct it to disable the firewall program upon restart.  

WARNING: Before starting this procedure, review the following:

* Stopping and starting the instance erases any data on [instance store volumes][instance-store-volumes]. Be sure that you [back up any data on the instance store volume][back-up] that you want to keep. For more information, see [Determine the root device type of your AMI][determine-root-device-type].
* Stopping and restarting the instance changes the public IP address of your instance. It's a best practice to use an [Elastic IP address][elastic-ip-address] instead of a public IP address when routing external traffic to your instance.

1. Stop your instance. (Do not terminate)  
2. In the console, select your instance and go to Actions -> Instance Settings -> Edit user data  
3. Select Modify user data as text and paste the following:  

    ```text
    Content-Type: multipart/mixed; boundary="//"
    MIME-Version: 1.0
    --//
    Content-Type: text/cloud-config; charset="us-ascii"
    MIME-Version: 1.0
    Content-Transfer-Encoding: 7bit
    Content-Disposition: attachment; filename="cloud-config.txt"
    #cloud-config
    cloud_final_modules:
    - [scripts-user, always]
    --//
    Content-Type: text/x-shellscript; charset="us-ascii"
    MIME-Version: 1.0
    Content-Transfer-Encoding: 7bit
    Content-Disposition: attachment; filename="userdata.txt"
    #!/bin/bash
    ufw disable
    iptables -L
    iptables -F
    --//
    ```

4. Save and Restart the instance and SSH should work. The user data disables UFW and flushes any iptable rules blocking SSH access.
5. After successfully connecting via SSH, you may reset the user data by following previous steps. 
    Select Modify user data as text, delete all text and save.

When a user data script is processed, it is copied to and run from ```/var/lib/cloud/instances/instance-id/```. 
The script is not deleted after it is run. Be sure to delete the user data scripts from 
```/var/lib/cloud/instances/instance-id/``` before you create an AMI from the instance. 
Otherwise, the script will exist in this directory on any instance launched from the AMI.
    
## Reference
<a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html" style="word-break: break-word;">https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html</a>
<a href="https://aws.amazon.com/premiumsupport/knowledge-center/execute-user-data-ec2/" style="word-break: break-word;">https://aws.amazon.com/premiumsupport/knowledge-center/execute-user-data-ec2/</a>

[instance-store-volumes]: https://aws.amazon.com/premiumsupport/knowledge-center/instance-store-vs-ebs/
[back-up]: https://aws.amazon.com/premiumsupport/knowledge-center/back-up-instance-store-ebs/
[determine-root-device-type]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ComponentsAMIs.html#display-ami-root-device-type
[elastic-ip-address]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html
