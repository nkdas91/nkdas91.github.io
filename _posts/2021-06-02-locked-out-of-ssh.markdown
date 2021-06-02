---
layout: post
title:  "Locked out of SSH after enabling UFW on Ubuntu EC2 instance?"
date:   2021-06-02 07:27:57 +0530
author: Neeraj Das
categories: blog
---
The solution is to stop the instance and instruct it to disable the firewall program upon restart.  

1. Stop your instance. (Do not terminate)  
2. In the console, select your instance, go to Actions -> Instance Settings -> Edit user data  
3. Select Modify user data as text and paste the following:  

    ```
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

    NOTE: The IP address will change if you are not using a static IP.  

5. After successful login via SSH, Delete the following files from the instance:
    ```
    sudo rm /var/lib/cloud/instances/<instance-id>/cloud-config.txt
    sudo rm /var/lib/cloud/instances/<instance-id>/scripts/*
    sudo rm /var/lib/cloud/instances/<instance-id>/user-data.txt*
    ```



