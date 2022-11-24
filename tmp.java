public class Test {
    public static void main(String args[]) {
        char grade = "C";

        switch(grade) {
            case 'A':
                System.out.println("优秀");
                break;
            case 'B':
            case 'C':
                System.out.println("良好");
                break;
            case 'D':
                System.out.println("通过");
                break;
            case 'F':
                System.out.println("再试一次吧");
                break;
            default:
                System.out.println("无效的分数");
        }
    }
}

